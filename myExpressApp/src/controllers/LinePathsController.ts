import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import config from '../config';

import ILinePathsController from './interface/ILinePathsController'
import LinePathsService from '../services/LinePathsService';
import ILinePathsService from '../services/interface/ILinePathsService';
import ILineDTO from '../dto/LineDTO/ILineDTO';
import NodeService from '../services/NodeService';

import {celebrate, Joi} from 'celebrate';
import { Result } from '../core/logic/Result';

import PathRepo from '../repositories/PathRepo';
import PathSchema from '../dataschemas/PathSchema';
import NodeRepo from '../repositories/NodeRepo';
import NodeSchema from '../dataschemas/NodeSchema';
import { PathSegment } from '../domain/models/PathSegment';
import { LinePathsMap } from '../mappers/LinePathsMap';
import LineRepo from '../repositories/LineRepo';
import LineSchema from '../dataschemas/LineSchema';

export default class LinePathsController implements ILinePathsController{
    constructor(
        @Inject(config.services.LinePaths.name) private linePathsServiceInstance : ILinePathsService
    ) {}

    public async createLinePaths(req: Request, res: Response, next: NextFunction) {
        celebrate({
        });

        try{
            console.log(req.body);
            const nodeService = new NodeService(new NodeRepo(NodeSchema));
            const pathSegments = new Array<PathSegment>();
            const forLoop = req.body[4];
            for (let index = 0; index < forLoop.length; index++) {
                const pathSegment = PathSegment.create(forLoop[2], forLoop[3], (await nodeService.findByName(forLoop[0])).getValue(), (await nodeService.findByName(forLoop[1])).getValue(), index).getValue();
                pathSegments.push(pathSegment);
            };
            const dto = LinePathsMap.toDTO(req.body[0], req.body[1], req.body[2], req.body[3], pathSegments);
            const callService = await new LinePathsService(new PathRepo(PathSchema), new LineRepo(LineSchema)).createLinePaths(dto) as Result<ILineDTO>;

            if(callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}