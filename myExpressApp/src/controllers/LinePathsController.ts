import { Inject } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

import ILinePathsController from './interface/ILinePathsController'
import ILinePathsService from '../services/interface/ILinePathsService';
import ILineDTO from '../dto/LineDTO/ILineDTO';
import NodeService from '../services/NodeService';

import { celebrate, CelebrateError, Joi } from 'celebrate';
import { Result } from '../core/logic/Result';

import NodeRepo from '../repositories/NodeRepo';
import NodeSchema from '../dataschemas/NodeSchema';
import { PathNode } from '../domain/models/PathNode';
import { LinePathsMap } from '../mappers/LinePathsMap';

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
            const nodeService = new NodeService(new NodeRepo(NodeSchema));
            const pathNodes = new Array<PathNode>();
            const reqlength = Object.keys(req.body.pathNodes).length;
            const forLoop = req.body.pathNodes;

            const firstPathNode = PathNode.create(forLoop[0][0], (await nodeService.findByName(forLoop[0][1])).getValue(), 0, 0).getValue();
            pathNodes.push(firstPathNode);

            for (let index = 1; index < reqlength; index++) {
                const pathNode = PathNode.create(forLoop[index][0], (await nodeService.findByName(forLoop[index][1])).getValue(), forLoop[index][2],forLoop[index][3]).getValue();
                pathNodes.push(pathNode);
            };
            const dto = LinePathsMap.toDTO(req.body.line, req.body.toGo, req.body.key, req.body.isEmpty, pathNodes);
            const callService = await this.linePathsServiceInstance.createLinePaths(dto) as Result<ILineDTO>;

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
            return res.status(402).send();
        }

        return res.status(201).json(callService.getValue());
    }
}