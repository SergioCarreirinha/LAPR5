import { Router } from 'express';
import VehicleTypeRouter from './routes/VehicleTypeRouter';


// guaranteed to get dependencies
export default () => {
	const app = Router();
	VehicleTypeRouter(app);
	return app
}