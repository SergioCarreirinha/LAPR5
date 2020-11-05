import { Router } from 'express';
import VehicleType from './routes/VehicleTypeRouter';


// guaranteed to get dependencies
export default () => {
	const app = Router();
	VehicleType(app);
	return app
}