import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import config from '../config/';

import IVehicleTypeController from './interface/IVehicleTypeController'
import IVehicleTypeDTO from '../dto/VehicleTypeDTO/IVehicleTypeDTO';
import IVehicleTypeService from '../services/VehicleTypeService';

import {celebrate, Joi} from 'celebrate';
import { Result } from '../core/logic/Result';
import VehicleTypeRepo from '../repositories/VehicleTypeRepo';
import VehicleTypeSchema from '../dataschemas/VehicleTypeSchema';

export default class VehicleTypeController implements IVehicleTypeController{
    constructor(
        @Inject(config.services.VehicleType.name) private vehicleTypeServiceInstance : IVehicleTypeService
    ) {}

    public async createVehicleType(req: Request, res: Response, next: NextFunction) {
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                fuelType: Joi.string().required(),
                range: Joi.number().required(),
                costPerKm: Joi.number().required(),
                avgConsumptiom: Joi.number().required(),
                avgSpeed: Joi.number().required()
            })
        });

        try{
            console.log(config.services.VehicleType.name)
            const callService = await new IVehicleTypeService(new VehicleTypeRepo(VehicleTypeSchema)).createVehicleType(req.body as IVehicleTypeDTO) as Result<IVehicleTypeDTO>;

            if(callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}