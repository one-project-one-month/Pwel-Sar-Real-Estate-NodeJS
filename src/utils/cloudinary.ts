import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({
  api_key: '979156652869984',
  //   api_secret: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API secret
  api_secret: 'QNt_YQmDCS5ezVvbGZNCxtUbi3s', // Click 'View API Keys' above to copy your API secret
  cloud_name: 'dmwd4py47',
});

export const uploadToCloudinary = async (filePath: string) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });
    console.log('Uploaded successfully to cloudinary', uploadResult.url);
    fs.unlinkSync(filePath);
    console.log(filePath);
    return uploadResult.url;
  } catch (error) {
    console.log('Error at uploading to cloudinary', error);
    fs.unlinkSync(filePath);
    return null;
  }
};
