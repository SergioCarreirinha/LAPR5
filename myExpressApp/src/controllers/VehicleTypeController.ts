import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import {celebrate, Joi} from 'celebrate';
import IVehicleTypeDTO from '../dto/VehicleTypeDTO/IVehicleTypeDTO';
import IVehicleTypeService from '../services/VehicleTypeService';
import config from '../config';


export default class VehicleTypeController {
    constructor(
        @Inject(config.services.VehicleType.name) private vehicleTypeServiceInstance : IVehicleTypeService
    ) {}

    public async createVehicleType(req: Request, res: Response, next: NextFunction) {
        celebrate({
            body: Joi.object({
                name: Joi.string().required()
            })
        });

        try{
            console.log("AMIGOOOO");
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