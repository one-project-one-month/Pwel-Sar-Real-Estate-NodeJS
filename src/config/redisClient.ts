import Redis from "ioredis";
import logger from "./logger";
import config from "./env/redis";

const redis = new Redis({
  host: config.redisHost,
  port: config.redisPort,
  password: config.password,
  enableReadyCheck: true,
  maxRetriesPerRequest: null,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  reconnectOnError: (err) => {
    logger.error("[Redis] Connection error:", err);
    return false; // Don't reconnect on error
  },
});

// Add connection event handlers
redis.on("error", (error) => {
  logger.error("[Redis] Connection error:", error);
});

redis.on("connect", () => {
  logger.info("[Redis] Connected successfully");
});

redis.on("ready", () => {
  logger.info("[Redis] Ready to accept commands");
  // Initialize any required Redis keys here
  redis.set("server:status", "running").catch((err) => {
    logger.error("[Redis] Failed to set server status:", err);
  });
});

redis.on("reconnecting", () => {
  logger.info("[Redis] Reconnecting...");
});

// Test the connection
redis
  .ping()
  .then(() => {
    logger.info("[Redis] Connection test successful");
  })
  .catch((error) => {
    logger.error("[Redis] Connection test failed:", error);
  });

export { redis };
