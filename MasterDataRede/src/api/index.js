import { Router } from 'express';
import VehicleType from './routes/VehicleTypeRouter';
import DriverType from './routes/DriverTypeRouter';
import fileUpload from './routes/FileUploadRouter';
import Node from './routes/NodeRouter';
import Line from './routes/LineRouter';
import LinePaths from './routes/LinePathsRouter';
import Path from './routes/PathRouter';
import Planning from './routes/PlanningRouter';



// guaranteed to get dependencies
export default () => {
	const app = Router();
	VehicleType(app);
	DriverType(app);
	fileUpload(app);
	Node(app);
	Line(app);
	LinePaths(app);
	Path(app);
	Planning(app);
	return app
}