"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // We need this in order to use @Decorators
const express = require('express');
const logger_1 = require("./loaders/logger");
const config_1 = require("./config");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        yield require('./loaders').default({ expressApp: app });
        app.listen(config_1.default.port, err => {
            if (err) {
                logger_1.default.error(err);
                process.exit(1);
                return;
            }
            logger_1.default.info(`################################################
      🛡️  Server listening on port: ${config_1.default.port} 🛡️ 
      ################################################`);
        });
    });
}
startServer();
