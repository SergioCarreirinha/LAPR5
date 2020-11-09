import dependencyInjector from './dependencyInjector';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import config from '../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Intialized');
  
  const vehicleTypeSchema = {
    name: config.schemas.VehicleType.name,
    schema: config.schemas.VehicleType.schema
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

  const DriverTypeSchema = {
    name: config.schemas.DriverType.name,
    schema: config.schemas.DriverType.schema
  }
  
  const DriverTypeRepo = {
    name: config.repositories.DriverType.name,
    path: config.repositories.DriverType.path
  }

  const DriverTypeController = {
    name: config.controllers.DriverType.name,
    path: config.controllers.DriverType.path
  }

  const DriverTypeService = {
    name: config.services.DriverType.name,
    path: config.services.DriverType.path
  }
  const NodeSchema = {
    name: config.schemas.Node.name,
    schema: config.schemas.Node.schema
  }
  
  const NodeRepo = {
    name: config.repositories.Node.name,
    path: config.repositories.Node.path
  }

  const NodeController = {
    name: config.controllers.Node.name,
    path: config.controllers.Node.path
  }

  const NodeService = {
    name: config.services.Node.name,
    path: config.services.Node.path
  }


  await dependencyInjector({
    mongoConnection,
    schemas: [vehicleTypeSchema, DriverTypeSchema,NodeSchema],
    repositories: [vehicleTypeRepo, DriverTypeRepo,NodeRepo],
    controllers: [vehicleTypeController, DriverTypeController,NodeController],
    services: [vehicleTypeService, DriverTypeService,NodeService]
  })
  
  await expressLoader({ app: expressApp });
  console.log('Express Intialized');
  // ... more loaders can be here
}