import {Router} from 'express';
import { Container } from 'typedi';
import config from '../../config';
import IFileUploadController from '../../controllers/interface/IFileUploadController';

const route = Router();

export default (app: Router) => {

app.use('/fileUpload',route);

const crtl = Container.get(config.controllers.FileUpload.name) as IFileUploadController;

//recebe pedido post e redireciona para o controller
route.post('', (req, res, next) => crtl.fileUpload(req, res, next));

}
