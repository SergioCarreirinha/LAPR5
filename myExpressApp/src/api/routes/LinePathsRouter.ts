import {Router} from 'express';
import { Container } from 'typedi';
import ILinePathsController from '../../controllers/interface/ILinePathsController';
import config from '../../config';

const route = Router();

export default (app: Router) => {

    app.use('/linePaths', route);

    const crtl = Container.get(config.controllers.LinePaths.name) as ILinePathsController;

    route.post('', (req, res, next) => crtl.createLinePaths(req, res, next));

    route.get('', (req, res, next) => crtl.getLinePaths(req, res, next));
}