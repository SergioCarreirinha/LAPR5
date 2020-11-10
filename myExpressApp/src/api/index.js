import { Router } from 'express';
import VehicleType from './routes/VehicleTypeRouter';
import DriverType from './routes/DriverTypeRouter';
import Node from './routes/NodeRouter';
import Line from './routes/LineRoute';
import LinePaths from './routes/LinePathsRouter';


// guaranteed to get dependencies
export default () => {
	const app = Router();
	VehicleType(app);
	DriverType(app);
	Node(app);
	Line(app);
	LinePaths(app);
	return app
}