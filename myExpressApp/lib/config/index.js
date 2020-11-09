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
    schemas: {
        VehicleType: {
            name: 'VehicleTypeSchema',
            schema: '../dataschemas/VehicleTypeSchema'
        },
        DriverType: {
            name: 'DriverTypeSchema',
            schema: '../dataschemas/DriverTypeSchema'
        },
        Node: {
            name: 'NodeSchema',
            schema: '../dataschemas/NodeSchema'
        }
    },
    controllers: {
        VehicleType: {
            name: "VehicleTypeController",
            path: "../controllers/VehicleTypeController"
        },
        DriverType: {
            name: "DriverTypeController",
            path: "../controllers/DriverTypeController"
        },
        Node: {
            name: "NodeController",
            path: "../controllers/NodeController"
        }
    },
    repositories: {
        VehicleType: {
            name: "VehicleTypeRepo",
            path: "../repositories/VehicleTypeRepo"
        },
        DriverType: {
            name: "DriverTypeRepo",
            path: "../repositories/DriverTypeRepo"
        },
        Node: {
            name: "NodeRepo",
            path: "../repositories/NodeRepo"
        }
    },
    services: {
        VehicleType: {
            name: "VehicleTypeService",
            path: "../services/VehicleTypeService"
        },
        DriverType: {
            name: "DriverTypeService",
            path: "../services/DriverTypeService"
        },
        Node: {
            name: "NodeService",
            path: "../services/NodeService"
        }
    }
};
