import { Inject } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

import ILinePathsController from './interface/ILinePathsController'
import ILinePathsService from '../services/interface/ILinePathsService';
import ILineDTO from '../dto/LineDTO/ILineDTO';
import NodeService from '../services/NodeService';

import { celebrate, CelebrateError, Joi } from 'celebrate';
import { Result } from '../core/logic/Result';

import PathRepo from '../repositories/PathRepo';
import PathSchema from '../dataschemas/PathSchema';
import NodeRepo from '../repositories/NodeRepo';
import NodeSchema from '../dataschemas/NodeSchema';
import { PathSegment } from '../domain/models/PathSegment';
import { LinePathsMap } from '../mappers/LinePathsMap';
import { stringify } from 'querystring';

export default class LinePathsController implements ILinePathsController {
    constructor(
        @Inject(config.services.LinePaths.name) private linePathsServiceInstance: ILinePathsService
    ) { }

    public async createLinePaths(req: Request, res: Response, next: NextFunction) {

        celebrate({
            body: Joi.object({
                line: Joi.string().required(),
                toGo: Joi.boolean().required(),
                description: Joi.string().required(),
                isEmpty: Joi.boolean().required(),
                segments: Joi.array()
            })
        });

        try {
            const nodeService = new NodeService(new NodeRepo(NodeSchema));
            const pathSegments = new Array<PathSegment>();
            const reqlength = Object.keys(req.body.segments).length;
            const forLoop = req.body.segments;
            for (let index = 0; index < reqlength; index++) {
                const pathSegment = PathSegment.create(forLoop[index][2], forLoop[index][3], (await nodeService.findByName(forLoop[index][0])).getValue(), (await nodeService.findByName(forLoop[index][1])).getValue(), index + 1).getValue();
                pathSegments.push(pathSegment);
            };
            const dto = LinePathsMap.toDTO(req.body.line, req.body.toGo, req.body.description, req.body.isEmpty, pathSegments);
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