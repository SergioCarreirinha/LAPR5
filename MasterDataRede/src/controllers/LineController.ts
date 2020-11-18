import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import config from '../config/';

import ILineController from "./interface/ILineController";
import ILineDTO from '../dto/LineDTO/ILineDTO';
import ILineService from '../services/interface/ILineService';


import { Result } from '../core/logic/Result';

export default class LineController implements ILineController {
    constructor(
        @Inject(config.services.Line.name) private lineServiceInstance : ILineService
    ) {}

    public async createLine(req: Request, res: Response, next: NextFunction) {
        try{
            
            const callService = await this.lineServiceInstance.createLine(req.body as ILineDTO) as Result<ILineDTO>;

            if(callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }

    public async getAllLines(req: Request, res: Response, next: NextFunction) {
        try {
            const callService = await this.lineServiceInstance.getAllLines(req);

            if (callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}