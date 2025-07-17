import { Queue } from 'bullmq';

import { redis } from '../../config/redisClient';

const cloudImageQueue = new Queue('cloudinaryImageQueue', {
  connection: redis,
  defaultJobOptions: {
    attempts: 0,
    backoff: {
      delay: 1000, // Initial delay of 1 second
      type: 'exponential',
    },
    removeOnComplete: true, // Automatically remove completed jobs
    removeOnFail: true, // Automatically remove failed jobs
  },
});

export default cloudImageQueue;
