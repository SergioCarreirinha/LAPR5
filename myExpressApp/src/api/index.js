import { Router } from 'express';
import VehicleType from './routes/VehicleTypeRouter';
import DriverType from './routes/DriverTypeRouter';



// guaranteed to get dependencies
export default () => {
	const app = Router();
	VehicleType(app);
	DriverType(app);
	return app
}