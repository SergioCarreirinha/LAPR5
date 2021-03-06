import dotenv = require('dotenv');
import path = require('path');

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
        Solution: {
            name: "SolutionSchema",
            schema: '../dataschemas/SolutionSchema'
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
        FileUpload:{
            name: "FileUploadController",
            path: "../controllers/FileUploadController"
        },
        Node: {
            name: "NodeController",
            path: "../controllers/NodeController"
        },
        LinePaths: {
            name: "LinePathsController",
            path: "../controllers/LinePathsController"
        },
        Line: {
            name: "LineController",
            path: "../controllers/LineController"
        },
        Path: {
            name: "PathController",
            path:"../controllers/PathController"
        },
        Planning: {
            name: "PlanningController",
            path: "../controllers/PlanningController"
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
        Planning: {
            name: "PlanningRepo",
            path: "../repositories/PlanningRepo"
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
        FileUpload:{
            name: "FileUploadService",
            path: "../services/FileUploadService"
        },
        Node: {
            name: "NodeService",
            path: "../services/NodeService"
        },
        LinePaths: {
            name: "LinePathsService",
            path: "../services/LinePathsService"
        },
        Line: {
            name: "LineService",
            path: "../services/LineService"
        },
        Path: {
            name: "PathService",
            path: "../services/PathService"
        },
        Planning: {
            name: "PlanningService",
            path: "../services/PlanningService"
        }
    }
}