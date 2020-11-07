const loaders = require('./loaders');
const express = require('express');
const api = require('./api');

async function startServer() {

  const app = express();

  await loaders.default({ expressApp: app });
  
  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
    console.log(process.env.PORT);
  });
}
startServer();