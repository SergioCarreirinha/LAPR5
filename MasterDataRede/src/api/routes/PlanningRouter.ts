import {Router} from 'express';
import { Container } from 'typedi';
import IPlanningController from '../../controllers/interface/IPlanningController';
import config from '../../config';

const route = Router();

export default (app: Router) => {

    app.use('/planning', route);

    const crtl = Container.get(config.controllers.Planning.name) as IPlanningController;

    route.post('', (req, res, next) => crtl.saveSolution(req, res, next));
    route.get('', (req, res, next) => crtl.getSolutions(req, res, next))
}