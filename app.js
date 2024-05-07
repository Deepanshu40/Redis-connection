const express = require('express');
const app = express();
const port = 8080;
const Redis = require('ioredis');
const redis = new Redis('rediss://red-cosclhq0si5c739t8bpg:F9IpuAyVAw9n6DYGFWrjJmiJeZWqXKXR@oregon-redis.render.com:6379');


const Queue = require('bull');

// const panQueue = new Queue('panQueue', {
//         redis: {
//         url: 'rediss://red-cosclhq0si5c739t8bpg:F9IpuAyVAw9n6DYGFWrjJmiJeZWqXKXR@oregon-redis.render.com:6379' 
//         }
//     });

const panQueue = new Queue('panQueue', {
  redis: {
    port: 6379, // Redis port
    host: 'oregon-redis.render.com', // Redis host
    password: 'F9IpuAyVAw9n6DYGFWrjJmiJeZWqXKXR', // Redis password
    tls: {} // This might be necessary if you're using 'rediss://'
  }
});


redis.on('connect', () => {
        console.log(redis.options);
});


redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});


panQueue.on('error', (err) => {
    console.error('Bull queue error:', err);
});

app.listen(port, () => {
    console.log('Listening on port 8000');
});
