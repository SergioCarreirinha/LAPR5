import { Container } from 'typedi';
import LoggerInstance from './logger';


export default ({ mongoConnection, schemas, repositories, controllers, services }: 
    { mongoConnection; 
      schemas: { name: string; schema: any }[],
      repositories: {name: string; path: any}[]
      controllers: {name: string; path: any}[]
      services: {name: string; path: any}[] }) => {
  try {

    Container.set('logger',LoggerInstance);

    schemas.forEach(m => {
        let schema = require(m.schema).default;
        Container.set(m.name, schema);
    });
    LoggerInstance.info('🔥 Schemas are all injected!');

    repositories.forEach(m => {
        let repoClass = require(m.path).default
        let repoInstance = Container.get(repoClass);
        Container.set(m.name, repoInstance);
    });
    LoggerInstance.info('🦄 Repositories are all injected!');

    services.forEach(m => {
        let serviceClass = require(m.path).default
        let serviceInstance = Container.get(serviceClass);
        Container.set(m.name, serviceInstance);
    });
    LoggerInstance.info('🐶 Services are all injected!');

    controllers.forEach(m => {
        let controllerClass = require(m.path).default
        let controllerInstance = Container.get(controllerClass);
        Container.set(m.name, controllerInstance);
    });
    LoggerInstance.info('❤️ Controllers are all injected!');


    LoggerInstance.info('✌️ All injected into container');
    return;

  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
