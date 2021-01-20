import { Inject } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import config from '../config/';

import INodeController from './interface/INodeController';
import INodeDTO from '../dto/NodeDTO/INodeDTO';
import INodeService from '../services/interface/INodeService';

import { celebrate, Joi } from 'celebrate';
import { Result } from '../core/logic/Result';

export default class NodeController implements INodeController {
    constructor(
        @Inject(config.services.Node.name) private nodeServiceInstance: INodeService
    ) { }

    public async createNode(req: Request, res: Response, next: NextFunction) {
        celebrate({
            body: Joi.object({
                key: Joi.string().required(),
                name: Joi.string().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                shortName: Joi.string().required(),
                isDepot: Joi.boolean().required(),
                isReliefPoint: Joi.boolean().required(),

            })
        });

        try {
            const callService = await this.nodeServiceInstance.createNode(req.body as INodeDTO) as Result<INodeDTO>;

            if (callService.isFailure) {
                return res.status(406).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
    public async findByKey(req: Request, res: Response, next: NextFunction) {
        try {
            const callService = await this.nodeServiceInstance.findByKey(req.body.key);

            if (callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const callService = await this.nodeServiceInstance.findAll(req);

            if (callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}
