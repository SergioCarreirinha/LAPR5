import dependencyInjector from './dependencyInjector';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import config from '../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Intialized');
  
  const VehicleTypeSchema = {
    name: config.schemas.VehicleType.name,
    schema: config.schemas.VehicleType.schema
  }
  
  const VehicleTypeRepo = {
    name: config.repositories.VehicleType.name,
    path: config.repositories.VehicleType.path
  }

  const VehicleTypeController = {
    name: config.controllers.VehicleType.name,
    path: config.controllers.VehicleType.path
  }

  const VehicleTypeService = {
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

  const LineSchema = {
    name: config.schemas.Line.name,
    schema: config.schemas.Line.schema
  }
  
  const LineRepo = {
    name: config.repositories.Line.name,
    path: config.repositories.Line.path
  }

  const LineController = {
    name: config.controllers.Line.name,
    path: config.controllers.Line.path
  }

  const LineService = {
    name: config.services.Line.name,
    path: config.services.Line.path
  }

  const LinePathsController = {
    name: config.controllers.LinePaths.name,
    path: config.controllers.LinePaths.path
  }

  const LinePathsService = {

    name: config.services.LinePaths.name,
    path: config.services.LinePaths.path
  }

  const PathSchema = {
    name: config.schemas.Path.name,
    schema: config.schemas.Path.schema
  }

  const PathRepo = {
    name: config.repositories.Path.name,
    path: config.repositories.Path.path
  }

  const PathController = {
    name: config.controllers.Path.name,
    path: config.controllers.Path.path
  }

  const PathService = {

    name: config.services.Path.name,
    path: config.services.Path.path
  }
  
  const FileUploadController = {
    name: config.controllers.FileUpload.name,
    path: config.controllers.FileUpload.path
  }

  const FileUploadService = {
    name: config.services.FileUpload.name,
    path: config.services.FileUpload.path
  }

  const SolutionSchema = {
    name: config.schemas.Solution.name,
    schema: config.schemas.Solution.schema
  }
  
  const PlanningRepo = {
    name: config.repositories.Planning.name,
    path: config.repositories.Planning.path
  }

  const PlanningController = {
    name: config.controllers.Planning.name,
    path: config.controllers.Planning.path
  }

  const PlanningService = {
    name: config.services.Planning.name,
    path: config.services.Planning.path
  }

  await dependencyInjector({
    mongoConnection,
    schemas: [VehicleTypeSchema, DriverTypeSchema, NodeSchema, LineSchema , PathSchema, SolutionSchema],
    repositories: [VehicleTypeRepo, DriverTypeRepo, NodeRepo, LineRepo, PathRepo, PlanningRepo],
    controllers: [VehicleTypeController, DriverTypeController, NodeController, LineController, PathController, LinePathsController,FileUploadController, PlanningController],
    services: [VehicleTypeService, DriverTypeService, NodeService, LineService, LinePathsService, PathService, FileUploadService, PlanningService]
  })
  
  await expressLoader({ app: expressApp });
  console.log('Express Intialized');
  // ... more loaders can be here
}