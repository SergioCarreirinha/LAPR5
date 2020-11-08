import {Inject} from 'typedi';
import {Request, Response, NextFunction} from 'express';
import config from '../config/';

import IDriverTypeController from "./interface/IDriverTypeController";
import IDriverTypeDTO from '../dto/DriverTypeDTO/IDriverTypeDTO';
import IDriverTypeService from '../services/interface/IDriverTypeService';

import {celebrate, Joi} from 'celebrate';
import { Result } from '../core/logic/Result';
import DriverTypeService from '../services/DriverTypeService';
import DriverTypeRepo from '../repositories/DriverTypeRepo';
import DriverTypeSchema from '../dataschemas/DriverTypeSchema';

export default class DriverTypeController implements IDriverTypeController {
    constructor(
        @Inject(config.services.DriverType.name) private driverTypeServiceInstance : IDriverTypeService
    ) {}

    public async createDriverType(req: Request, res: Response, next: NextFunction) {
        celebrate({
            body: Joi.object({
                description: Joi.string().required()
            })
        });

        try{
            console.log(config.services.DriverType.name)
            const callService = await new DriverTypeService(new DriverTypeRepo(DriverTypeSchema)).createDriverType(req.body as IDriverTypeDTO) as Result<IDriverTypeDTO>;

            if(callService.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(callService.getValue());

        } catch (e) {
            return next(e);
        }
    }
}