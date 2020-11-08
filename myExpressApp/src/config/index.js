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
    

    controllers: {
        VehicleType: {
            name: "VehicleTypeController",
            path: "../controllers/VehicleTypeController"
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
}