import * as sinon from 'sinon';
import * as sinonchai from 'sinon-chai';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../config";
import { Result } from '../../core/logic/Result';
import IVehicleTypeDTO from '../../dto/VehicleTypeDTO/IVehicleTypeDTO';
import VehicleTypeController from '../../controllers/VehicleTypeController';
import IVehicleTypeService from '../../services/interface/IVehicleTypeService';

describe('Node Controller', function () {
	beforeEach(function() {
    });

    afterEach(function() { 
        sinon.restore();   
    });

    it('createVehicleType: returns json with line values', async function() {
        let body = {
            "key": "Tes2342342423423te",
            "name": "Valavadores",
            "autonomy": 46.254,
            "cost": 50.1204,
            "averageSpeed": 123,
            "energySource": 123,
            "consumption": 123,
            "emissions": 30 
        };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let VehicleTypeServiceClass = require('../'+config.services.VehicleType.path).default;
		let VehicleTypeServiceInstance = Container.get(VehicleTypeServiceClass);
		Container.set(config.services.VehicleType.name, VehicleTypeServiceInstance);

		VehicleTypeServiceInstance = Container.get(config.services.VehicleType.name);
        const mock =sinon.stub(VehicleTypeServiceInstance, "createVehicleType").returns(Result.ok<IVehicleTypeDTO>({
            "key": req.body.key,
            "name": req.body.name,
            "autonomy": req.body.autonomy,
            "cost": req.body.cost,
            "averageSpeed": req.body.averageSpeed,
            "energySource": req.body.energySource,
            "consumption": req.body.consumption,
            "emissions": req.body.emissions
        }));
		const ctrl = new VehicleTypeController(VehicleTypeServiceInstance as IVehicleTypeService);
        await ctrl.createVehicleType(<Request>req, <Response>res, <NextFunction>next);
        
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({
            "key": req.body.key,
            "name": req.body.name,
            "autonomy": req.body.autonomy,
            "cost": req.body.cost,
            "averageSpeed": req.body.averageSpeed,
            "energySource": req.body.energySource,
            "consumption": req.body.consumption,
            "emissions": req.body.emissions
         }));
    });
});