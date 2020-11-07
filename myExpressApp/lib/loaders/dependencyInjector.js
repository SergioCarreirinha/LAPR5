"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const logger_1 = require("./logger");
exports.default = ({ mongoConnection, schemas, repositories, controllers, services }) => {
    try {
        typedi_1.Container.set('logger', logger_1.default);
        schemas.forEach(m => {
            let schema = require(m.schema).default;
            typedi_1.Container.set(m.name, schema);
        });
        logger_1.default.info('🔥 Schemas are all injected!');
        repositories.forEach(m => {
            let repoClass = require(m.path).default;
            let repoInstance = typedi_1.Container.get(repoClass);
            typedi_1.Container.set(m.name, repoInstance);
        });
        logger_1.default.info('🦄 Repositories are all injected!');
        services.forEach(m => {
            let serviceClass = require(m.path).default;
            let serviceInstance = typedi_1.Container.get(serviceClass);
            typedi_1.Container.set(m.name, serviceInstance);
        });
        logger_1.default.info('🐶 Services are all injected!');
        controllers.forEach(m => {
            let controllerClass = require(m.path).default;
            let controllerInstance = typedi_1.Container.get(controllerClass);
            typedi_1.Container.set(m.name, controllerInstance);
        });
        logger_1.default.info('❤️ Controllers are all injected!');
        logger_1.default.info('✌️ All injected into container');
    }
    catch (e) {
        logger_1.default.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
