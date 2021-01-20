import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import config from '../config/';

import IVehicleTypeController from './interface/IVehicleTypeController'
import IVehicleTypeDTO from '../dto/VehicleTypeDTO/IVehicleTypeDTO';
import IVehicleTypeService from '../services/interface/IVehicleTypeService';

import {celebrate, Joi} from 'celebrate';
import { Result } from '../core/logic/Result';

export default class VehicleTypeController implements IVehicleTypeController{
    constructor(
        @Inject(config.services.VehicleType.name) private vehicleTypeServiceInstance : IVehicleTypeService
    ) {}

    public async createVehicleType(req: Request, res: Response, next: NextFunction) {
        celebrate({
            body: Joi.object({
                key: Joi.string().required(),
                name: Joi.string().required(),
                autonomy: Joi.number().required(),
                cost: Joi.number().required(),
                averageSpeed: Joi.number().required(),
                energySource: Joi.number().required(),
                consumption: Joi.number().required(),
                emissions: Joi.number().required()
            })
        });

        try{
            console.log(config.services.VehicleType.name)
            const callService = await this.vehicleTypeServiceInstance.createVehicleType(req.body as IVehicleTypeDTO) as Result<IVehicleTypeDTO>;

            if(callService.isFailure) {
                return res.status(406).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }

    public async getAllVehicleTypes(req: Request, res: Response, next: NextFunction){
        try {
            const callService = await this.vehicleTypeServiceInstance.getAllVehicleTypes();

            if (callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}