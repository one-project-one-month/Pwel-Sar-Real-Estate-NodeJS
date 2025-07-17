import Redis from 'ioredis';

import config from './env/redis';
import logger from './logger';

const redis = new Redis({
  enableReadyCheck: true,
  host: config.redisHost,
  maxRetriesPerRequest: null,
  password: config.password,
  port: config.redisPort,
  reconnectOnError: (err) => {
    logger.error('[Redis] Connection error:', err);
    return false; // Don't reconnect on error
  },
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

// Add connection event handlers
redis.on('error', (error) => {
  logger.error('[Redis] Connection error:', error);
});

redis.on('connect', () => {
  logger.info('[Redis] Connected successfully');
});

redis.on('ready', () => {
  logger.info('[Redis] Ready to accept commands');
  // Initialize any required Redis keys here
  redis.set('server:status', 'running').catch((err) => {
    logger.error('[Redis] Failed to set server status:', err);
  });
});

redis.on('reconnecting', () => {
  // No log needed for reconnecting
});

// Remove test connection logs for less noise
// redis
//   .ping()
//   .then(() => {
//     logger.info('[Redis] Connection test successful');
//   })
//   .catch((error) => {
//     logger.error('[Redis] Connection test failed:', error);
//   });

export { redis };
