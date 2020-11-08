import dependencyInjector from './dependencyInjector';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import config from '../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Intialized');
  
  const vehicleTypeSchema = {
    name: 'VehicleTypeSchema',
    schema: '../dataschemas/VehicleTypeSchema'
  }
  
  const vehicleTypeRepo = {
    name: config.repositories.VehicleType.name,
    path: config.repositories.VehicleType.path
  }

  const vehicleTypeController = {
    name: config.controllers.VehicleType.name,
    path: config.controllers.VehicleType.path
  }

  const vehicleTypeService = {
    name: config.services.VehicleType.name,
    path: config.services.VehicleType.path
  }

  await dependencyInjector({
    mongoConnection,
    schemas: [vehicleTypeSchema],
    repositories: [vehicleTypeRepo],
    controllers: [vehicleTypeController],
    services: [vehicleTypeService]
  })
  
  await expressLoader({ app: expressApp });
  console.log('Express Intialized');
  // ... more loaders can be here
}