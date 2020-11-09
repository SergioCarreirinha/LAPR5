import { Router } from 'express';
import VehicleType from './routes/VehicleTypeRouter';
import DriverType from './routes/DriverTypeRouter';
import Node from './routes/NodeRouter';


// guaranteed to get dependencies
export default () => {
	const app = Router();
	VehicleType(app);
	DriverType(app);
	Node(app);
	return app
}