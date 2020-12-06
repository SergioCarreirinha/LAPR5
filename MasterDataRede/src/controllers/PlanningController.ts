import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import config from '../config/';

import IPlanningController from './interface/IPlanningController';
import ISolutionDTO from '../dto/SolutionDTO/ISolutionDTO';
import IPlanningService from '../services/interface/IPlanningService';

export default class PlanningController implements IPlanningController {
    constructor(
        @Inject(config.services.Planning.name) private planningService : IPlanningService
    ) {}

    public async saveSolution(req: Request, res: Response, next: NextFunction){
        try {
            const callService = await this.planningService.createSolution(req.body as ISolutionDTO);

            if (callService.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }

    public async getSolutions(req: Request, res: Response, next: NextFunction){
        try {
            const callService = await this.planningService.getSolutions();

            if (callService.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}