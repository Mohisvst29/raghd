const { mongoose } = require('mongoose');
const { translateObject } = require('./src/lib/translate.ts'); // Need to use ts-node or compile it.
// Let's just write a standalone js script for this one-time translation.

const MONGO_URI = process.env.MONGODB_URI;

const run = async () => {
    // 
};
