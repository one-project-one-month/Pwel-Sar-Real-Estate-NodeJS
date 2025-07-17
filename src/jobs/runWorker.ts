import logger from '../config/logger';
import { imageCloudinaryWorker } from './worker/cloudImageWorker';

logger.info('STARTING CLOUDINARY IMAGE WORKER PROCESS');

// Log Redis connection status (handled in redisClient)

// Track worker activity
let totalJobsProcessed = 0;

// Listen to worker events to track activity
imageCloudinaryWorker.on('completed', () => {
  totalJobsProcessed++;
  logger.info(
    `📊 Image Worker: ${totalJobsProcessed} image jobs processed recently`
  );
});

// Wait for worker to be ready
const startWorker = async () => {
  try {
    // Worker is automatically started when imported
    logger.info(
      '⚡ Cloudinary Image Worker initialized and ready to process image jobs'
    );
    logger.info('🟢 Image worker process is running and waiting for jobs...');

    // Remove heartbeat/interval logs for less noise
    // setInterval(() => { ... });

    // Keep process alive indefinitely
    await new Promise(() => {
      // This promise never resolves, keeping the process alive
    });
  } catch (error) {
    logger.error('❌ Image Worker startup failed:', error);
    process.exit(1);
  }
};

// Start the worker
startWorker();

// Graceful shutdown handlers
process.on('SIGTERM', async () => {
  logger.info('🛑 Received SIGTERM, shutting down image worker gracefully');
  await imageCloudinaryWorker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('🛑 Received SIGINT, shutting down image worker gracefully');
  await imageCloudinaryWorker.close();
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  logger.error('💥 Uncaught Exception in image worker:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(
    '💥 Unhandled Rejection in image worker at:',
    promise,
    'reason:',
    reason
  );
  process.exit(1);
});
