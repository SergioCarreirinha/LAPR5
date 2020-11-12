import 'reflect-metadata'; // We need this in order to use @Decorators

const express = require ('express');

import Logger from './loaders/logger';
import config from './config';

async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(
      `################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################`
    );
  });
}

startServer();