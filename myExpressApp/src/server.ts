const loaders = require('./loaders');
const express = require('express');
const bodyParser = require('body-parser');
async function startServer() {
  const app = express();

  //Import Routes
  const vehicleTypeRoute = require('./api/routes/VehicleTypeRouter');

  //ROUTE MIDDLEWARE
  app.use('/api/vehicleType', vehicleTypeRoute);

  //MIDDLEWEAR
  app.use(bodyParser.json());

  //await api.default({expressApp: app});

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