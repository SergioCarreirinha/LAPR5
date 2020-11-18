import {Router} from 'express';
import { Container } from 'typedi';
import IDriverController from '../../controllers/interface/IDriverController';
import config from '../../config';

const route = Router();

export default (app: Router) => {

    app.use('/driver', route);

    const crtl = Container.get(config.controllers.Driver.name) as IDriverController;

    route.post('', (req, res, next) => crtl.createDriver(req, res, next));
}