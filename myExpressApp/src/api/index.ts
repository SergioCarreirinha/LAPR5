const express = require('express');
const app = express();

//Import Routes
const vehicleTypeRoute = require('./api/routes/VehicleTypeRouter');

//ROUTE MIDDLEWARE
app.use('/api/vehicleType', vehicleTypeRoute);

