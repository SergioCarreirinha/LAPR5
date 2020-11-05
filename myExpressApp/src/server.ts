import { request } from "http";

const loaders = require('./loaders');
const express = require('express');
async function startServer() {
  var router = express.Router();
  const app = express();

  //Import Routes
  const vehicleTypeRoute = require('./api/routes/VehicleTypeRouter');

  //ROUTE MIDDLEWARE
  app.use('/api/vehicleType', vehicleTypeRoute);

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