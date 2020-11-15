import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../../core/logic/Result';

import IDriverTypeDTO from '../../dto/DriverTypeDTO/IDriverTypeDTO';
import DriverTypeController from '../../controllers/DriverTypeController';
import IDriverTypeService from '../../services/interface/IDriverTypeService';

describe('Driver Type Controller', function () {
	beforeEach(function() {
    });

    afterEach(function() { 
    });

    it('createDriverType: returns json with DriverType values', async function() {
        let body = {"description": "teste"};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let driverTypeServiceClass = require('../'+config.services.DriverType.path).default;
		let driverTypeServiceInstance = Container.get(driverTypeServiceClass)
		Container.set(config.services.DriverType.name, driverTypeServiceInstance);

		driverTypeServiceInstance = Container.get(config.services.DriverType.name);
        const mock = sinon.stub(driverTypeServiceInstance, "createDriverType").returns(Result.ok<IDriverTypeDTO>({"description": "teste"}));
		const ctrl = new DriverTypeController(driverTypeServiceInstance as IDriverTypeService);

        await ctrl.createDriverType(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({"description": "teste"}));
        mock.restore();
    });
});