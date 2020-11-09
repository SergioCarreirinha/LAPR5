import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import config from '../config/';

import INodeController from './interface/INodeController';
import INodeDTO from '../dto/NodeDTO/INodeDTO';
import INodeService from '../services/NodeService';

import {celebrate, Joi} from 'celebrate';
import { Result } from '../core/logic/Result';
import NodeRepo from '../repositories/NodeRepo';
import NodeSchema from '../dataschemas/NodeSchema';

export default class NodeController implements INodeController{
    constructor(
        @Inject(config.services.Node.name) private nodeServiceInstance : INodeService
    ) {}

    public async createNode(req: Request, res: Response, next: NextFunction) {
        celebrate({
            body: Joi.object({
                key: Joi.string().required(),
                name: Joi.string().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                shortName:Joi.string().required(),
                isDepot: Joi.boolean().required(),
                isReliefPoint: Joi.boolean().required(),

            })
        });

        try{
            console.log(config.services.Node.name)
            const callService = await new INodeService(new NodeRepo(NodeSchema)).createNode(req.body as INodeDTO) as Result<INodeDTO>;

            if(callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}