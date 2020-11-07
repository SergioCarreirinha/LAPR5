import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import {celebrate, Joi} from 'celebrate';
import IVehicleTypeDTO from '../dto/VehicleTypeDTO/IVehicleTypeDTO';
import IVehicleTypeService from '../services/VehicleTypeService';
import config from '../config';
import VehicleTypeRepo from '../repositories/VehicleTypeRepo';


export default class VehicleTypeController {
    constructor(
        @Inject(config.services.VehicleType.name) private vehicleTypeServiceInstance : IVehicleTypeService
    ) {
        //doubt
        this.vehicleTypeServiceInstance=new IVehicleTypeService(new VehicleTypeRepo);
    }

    public async createVehicleType(req: Request, res: Response, next: NextFunction) {
        celebrate({
            body: Joi.object({
                name: Joi.string().required()
            })
        });

        try{
            const callService = await this.vehicleTypeServiceInstance.createVehicleType(req.body as IVehicleTypeDTO);

            if(!callService) {
                return res.status(402).send();
            }

            return res.status(201).json(callService);

        } catch (e) {
            return next(e);
        }
    }
}