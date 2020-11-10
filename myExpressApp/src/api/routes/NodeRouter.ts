import {Router} from 'express';
import { Container } from 'typedi';
import INodeController from '../../controllers/interface/INodeController';
import config from '../../config';

const route = Router();

export default (app: Router) => {

    app.use('/node', route);

    const crtl = Container.get(config.controllers.Node.name) as INodeController;

    route.post('', (req, res, next) => crtl.createNode(req, res, next));
}