"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });
exports.default = {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URL,
    api: {
        prefix: '/api',
    },
};
