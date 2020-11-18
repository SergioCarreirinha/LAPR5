import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import config from '../config/';

import IDriverController from "./interface/IDriverController";
import IDriverDTO from '../dto/DriverDTO/IDriverDTO';
import IDriverService from '../services/interface/IDriverService';

import {celebrate, Joi} from 'celebrate';
import { Result } from '../core/logic/Result';

export default class DriverController implements IDriverController {
    constructor(
        @Inject(config.services.Driver.name) private driverServiceInstance : IDriverService
    ) {}

    public async createDriver(req: Request, res: Response, next: NextFunction) {
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                birthdate: Joi.date().required(),
                driverLicenseNum: Joi.number().required(),
                licenseExpiration: Joi.date().required(),
                driverTypes: Joi.array()
            })
        });

        try{
            
            const callService = await this.driverServiceInstance.createDriver(req.body as IDriverDTO) as Result<IDriverDTO>;

            if(callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}