import { Job, Worker } from 'bullmq';
import cloudinary, { UploadApiResponse } from 'cloudinary';
import sharp from 'sharp';

import config from '../../config/env/redis';
import { redis } from '../../config/redisClient';
import { prisma } from '../../libs/prismaClients';

cloudinary.v2.config({
  api_key: config.cloudApiKey,
  api_secret: config.cloudApiSecret,
  cloud_name: config.cloudName,
  secure: true,
});

// Define the expected job payload structure
interface ImageUploadJob {
  buffer: Buffer;
  propertyId: number;
}

// Helper to generate a unique name
function generateUniqueName() {
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
}

export const imageCloudinaryWorker = new Worker<ImageUploadJob>(
  'cloudinaryImageQueue',
  async (job: Job<ImageUploadJob>) => {
    const { buffer, propertyId } = job.data;

    if (!buffer) throw new Error('Missing image buffer');
    if (!propertyId) throw new Error('Missing propertyId');

    // If buffer is not a Buffer, try to convert from possible { data: ... } shape
    const realBuffer = Buffer.isBuffer(buffer)
      ? buffer
      : buffer && typeof (buffer as any).data !== 'undefined'
      ? Buffer.from((buffer as any).data)
      : (() => {
          throw new Error('Invalid buffer format');
        })();

    const processedBuffer = await sharp(realBuffer)
      .resize(1080)
      .webp({ quality: 90 })
      // .resize({ width: 800 }) // Optional: resize
      .toBuffer();

    // Check that the property exists before uploading
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) throw new Error(`Property ${propertyId} not found`);

    // Generate a unique public_id for Cloudinary (always .webp)
    const uniqueName = generateUniqueName();
    const publicId = `real-estate/uploads/${uniqueName}`;

    // Upload buffer directly to Cloudinary using upload_stream
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          format: 'webp', // always save as webp
          overwrite: true,
          public_id: publicId,
          resource_type: 'image',
          type: 'authenticated',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Cloudinary upload failed'));
          resolve(result);
        }
      );
      stream.end(processedBuffer);
    });

    // Save image to DB
    await prisma.propertyPhoto.create({
      data: {
        path: result.public_id, // e.g. 1720000000000-123456789
        propertyId: propertyId,
        url: result.secure_url,
      },
    });

    // Only log successful upload
    console.log(`✅ Image uploaded to Cloudinary: ${result.secure_url}`);
    // To generate a signed URL for admin viewing, use:
    // cloudinary.v2.url(result.public_id, { type: 'authenticated', sign_url: true, expires_at: ... })
  },
  { connection: redis }
);

// Event listeners
imageCloudinaryWorker.on('completed', (job) => {
  // Only log job completion
  console.log('✅ Cloudinary job completed with ID:', job.id);
});

imageCloudinaryWorker.on('failed', (job, error) => {
  // Only log errors
  console.error(`❌ Cloudinary job ${job?.id} failed with:`, error.message);
});
