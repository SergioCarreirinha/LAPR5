import {Router} from 'express';
import { Container } from 'typedi';
import IVehicleTypeController from '../../controllers/interface/IVehicleTypeController';
import config from '../../config';

const route = Router();

export default (app: Router) => {

    app.use('/vehicleType', route);

    const crtl = Container.get(config.controllers.VehicleType.name) as IVehicleTypeController;

    route.post('', (req, res, next) => crtl.createVehicleType(req, res, next));
}