import {Router} from 'express';
import { Container } from 'typedi';
import IDriverController from '../../controllers/interface/IDriverTypeController';
import config from '../../config';

const route = Router();

export default (app: Router) => {

    app.use('/driverType', route);

    const crtl = Container.get(config.controllers.DriverType.name) as IDriverController;

    route.post('', (req, res, next) => crtl.createDriverType(req, res, next));
}