import { Inject } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

import ILinePathsController from './interface/ILinePathsController'
import ILinePathsService from '../services/interface/ILinePathsService';
import ILineDTO from '../dto/LineDTO/ILineDTO';
import NodeService from '../services/NodeService';

import { celebrate, CelebrateError, Joi } from 'celebrate';
import { Result } from '../core/logic/Result';

import ILinePathsDTO from '../dto/LinePathsDTO/ILinePathsDTO';

export default class LinePathsController implements ILinePathsController {
    constructor(
        @Inject(config.services.LinePaths.name) private linePathsServiceInstance: ILinePathsService
    ) { }

    public async createLinePaths(req: Request, res: Response, next: NextFunction) {

        celebrate({
            body: Joi.object({
                line: Joi.string().required(),
                toGo: Joi.boolean().required(),
                key: Joi.string().required(),
                isEmpty: Joi.boolean().required(),
                pathNodes: Joi.array()
            })
        });

        try {
            const callService = await this.linePathsServiceInstance.createLinePaths(req.body as ILinePathsDTO) as Result<ILineDTO>;

            if (callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }

    public async getLinePaths(req: Request, res: Response, next: NextFunction) {
        const callService = await this.linePathsServiceInstance.getLinePaths(req.body.line);

        if (callService.isFailure) {
            return res.status(404).send(callService.error);
        }

        return res.status(201).json(callService.getValue());
    }
}