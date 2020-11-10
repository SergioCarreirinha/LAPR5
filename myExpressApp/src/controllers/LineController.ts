import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import config from '../config/';

import ILineController from "./interface/ILineController";
import ILineDTO from '../dto/LineDTO/ILineDTO';
import LineService from '../services/LineService';
import ILineService from '../services/interface/ILineService';
import LineRepo from '../repositories/LineRepo';
import LineSchema from '../dataschemas/LineSchema';

import {celebrate, Joi} from 'celebrate';
import { Result } from '../core/logic/Result';
import { Line } from '../domain/models/Line';

export default class LineController implements ILineController {
    constructor(
        @Inject(config.services.Line.name) private lineServiceInstance : ILineService
    ) {}

    public async createLine(req: Request, res: Response, next: NextFunction) {
        try{
            
            const callService = await new LineService(new LineRepo(LineSchema)).createLine(req.body as ILineDTO) as Result<ILineDTO>;

            if(callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}