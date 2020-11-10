import {Router} from 'express';
import { Container } from 'typedi';
import ILineController from '../../controllers/interface/ILineController';
import config from '../../config';

const route = Router();

export default (app: Router) => {

    app.use('/line', route);

    const crtl = Container.get(config.controllers.Line.name) as ILineController;

    route.post('', (req, res, next) => crtl.createLine(req, res, next));
}

