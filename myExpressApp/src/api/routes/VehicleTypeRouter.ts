import {Router} from 'express';
import { Container } from 'typedi';
import VehicleTypeController from '../../controllers/VehicleTypeController';

const route = Router();

export default (app: Router) => {

    app.use('/vehicleType', route);

    const crtl = Container.get(VehicleTypeController);

    route.post('', (req, res, next) => crtl.createVehicleType(req, res, next));
}