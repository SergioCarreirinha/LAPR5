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
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    controllers: {
        VehicleType: {
            name: "VehicleTypeController",
            path: "../controllers/VehicleTypeController"
        }
    },
    schemas: {
        VehicleType: {
            name: "VehicleTypeSchema",
            schema: "../dataschemas/VehicleTypeSchema"
        }
    },
    repositories: {
        VehicleType: {
            name: "VehicleTypeRepo",
            path: "../repositories/VehicleTypeRepo"
        }
    },
    services: {
        VehicleType: {
            name: "VehicleTypeService",
            path: "../services/VehicleTypeService"
        }
    }
};
