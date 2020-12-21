import {Router} from 'express';
import { Container } from 'typedi';
import IPathController from '../../controllers/interface/IPathController';
import config from '../../config';

const route = Router();

export default (app: Router) => {

    app.use('/paths', route);

    const crtl = Container.get(config.controllers.Path.name) as IPathController;

    route.get('', (req, res, next) => crtl.getPaths(req, res, next));

    route.get('/pathByKey', (req, res, next) => crtl.getPathByKey(req, res, next));
}