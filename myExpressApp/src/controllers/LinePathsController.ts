import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import config from '../config';

import ILinePathsController from './interface/ILinePathsController'
import IVehicleTypeDTO from '../dto/VehicleTypeDTO/IVehicleTypeDTO';
import ILinePathsService from '../services/ILinePathsService';

import {celebrate, Joi} from 'celebrate';
import { Result } from '../core/logic/Result';
import VehicleTypeRepo from '../repositories/VehicleTypeRepo';
import VehicleTypeSchema from '../dataschemas/VehicleTypeSchema';

export default class LinePathsController implements ILinePathsController{
    constructor(
        @Inject(config.services.LinesPath.name) private linePathsServiceInstance : ILinePathsService
    ) {this.linePathsServiceInstance=new }

    public async createLinePaths(req: Request, res: Response, next: NextFunction) {
        celebrate({
            /*body: Joi.object({
                name: Joi.string().required(),
                fuautonomyelType: Joi.number().required(),
                cost: Joi.number().required(),
                averageSpeed: Joi.number().required(),
                energySource: Joi.number().required(),
                consumption: Joi.number().required(),
                emissions: Joi.number().required()
            })*/
        });

        try{
            console.log(config.services.LinesPath.name)
            const callService = await new ILinePathsService(new VehicleTypeRepo(VehicleTypeSchema)).createVehicleType(req.body as IVehicleTypeDTO) as Result<IVehicleTypeDTO>;

            if(callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}