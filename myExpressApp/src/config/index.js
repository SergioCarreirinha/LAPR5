const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname, '.env') });

export default{
    port: process.env.PORT,

    databaseURL: process.env.DATABASE_URL,

    api: {
        prefix: '/api',
    },

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
      },
    

    schemas:{
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
        },
        Line: {
            name: 'LineSchema',
            schema: '../dataschemas/LineSchema'
        },
        Path: {
            name: 'PathSchema',
            schema: '../dataschemas/PathSchema'
        },
        Line: {
            name: 'LineSchema',
            schema: '../dataschemas/LineSchema'
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
        },
        LinePaths: {
            name: "LinePathsController",
            path: "../controllers/LinesPathController"
        },
        Line: {
            name: "LineController",
            path: "../controllers/LineController"
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
        },
        Line: {
            name: "LineRepo",
            path: "../repositories/LineRepo"
        },
        Path: {
            name: "PathRepo",
            path: "../repositories/PathRepo"
        },
        Line: {
            name: "LineRepo",
            path: "../repositories/LineRepo"
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
        },
        LinePaths: {
            name: "LinePathsService",
            path: "../services/LinesPathService"
        },
        Line: {
            name: "LineService",
            path: "../services/LineService"
        }
    }
}