const express = require('express');
const Redis = require('ioredis');
const Queue = require('bull');

const app = express();
const port = 8080;  // Make sure this matches the log statement

// Configuration for Redis connection
const redisUrl = 'rediss://red-cosclhq0si5c739t8bpg:F9IpuAyVAw9n6DYGFWrjJmiJeZWqXKXR@oregon-redis.render.com:6379';
const redis = new Redis(redisUrl);
const redisOptions = {
  redis: {
    url: redisUrl,
    tls: {}  // Necessary if using 'rediss://' to indicate SSL/TLS connection
  }
};

// Create a new Bull queue with the specified Redis configuration
const panQueue = new Queue('panQueue', redisOptions);

// Redis connection success
redis.on('connect', () => {
  console.log('Connected to Redis:', redis.options);
});

// Redis connection error logging
redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Bull queue error logging
panQueue.on('error', (err) => {
  console.error('Bull queue error:', err);
});

// Simple test to verify Redis connection
redis.set('test_key', 'test_value', (err) => {
  if (err) {
    console.error('Error setting key on Redis:', err);
  } else {
    redis.get('test_key', (err, result) => {
      if (err) {
        console.error('Error getting key from Redis:', err);
      } else {
        console.log('Value retrieved from Redis:', result); // Should log 'test_value'
      }
    });
  }
});

// Start Express server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
