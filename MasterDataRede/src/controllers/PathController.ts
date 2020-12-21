import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import config from '../config/';

import IPathController from './interface/IPathController';
import IPathService from '../services/interface/IPathService';

export default class PathController implements IPathController {
    constructor(
        @Inject(config.services.Path.name) private pathService : IPathService
    ) {}
    
    public async getPaths(req: Request, res: Response, next: NextFunction){
        try {
            const callService = await this.pathService.getPaths();

            if (callService.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }

    public async getPathByKey(req: Request, res: Response, next: NextFunction){
        try {
            const callService = await this.pathService.getPathByKey(req.query.key as string);

            if (callService.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}