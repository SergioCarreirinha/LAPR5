import {Router} from 'express';
import { Container } from 'typedi';
import INodeController from '../../controllers/interface/INodeController';
import config from '../../config';

const route = Router();

export default (app: Router) => {

    app.use('/node', route);

    const crtl = Container.get(config.controllers.Node.name) as INodeController;

    route.post('', (req, res, next) => crtl.createNode(req, res, next));

    route.get('', (req,res,next) => crtl.findAll(req,res,next));

    route.get('/findNode',(req,res,next) => crtl.findByKey(req,res,next));

    //route.delete('', (req,res,next) => crtl.delete(req,res,next));
}