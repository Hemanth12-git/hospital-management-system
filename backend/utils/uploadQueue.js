const Queue = require('bull');
const { redisConfig } = require('../config/redis-config');
const { processFile } = require('../worker/processFile');

const uploadQueue = new Queue('file-upload-queue', {
    redis: {
        host: redisConfig.host,
        port: redisConfig.port
    }
});

uploadQueue.process(async (job) => {
    const { filePath } = job.data;
    console.log('Processing file:', filePath);
    await processFile(filePath);
    console.log('File processing complete:', filePath);
});

module.exports = uploadQueue;
