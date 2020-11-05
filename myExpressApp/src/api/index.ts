const express = require('express');
import { Router } from 'express';
const app = express();
const vehicleTypeRouter = require('./routes/VehicleTypeRouter');

// guaranteed to get dependencies
export default () => {
	const app = Router();
	vehicleTypeRouter(app);
	return app
}