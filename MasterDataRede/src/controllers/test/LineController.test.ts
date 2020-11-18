import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../../core/logic/Result';

import ILineDTO from '../../dto/LineDTO/ILineDTO';
import LineController from '../../controllers/LineController';
import ILineService from '../../services/interface/ILineService';

describe('Line Controller', function () {
	beforeEach(function() {
    });

    afterEach(function() { 
    });

    it('createLine: returns json with line values', async function() {
        let body = {"key": "teste", "name": "teste", "color": "RGB(0,0,0)", "linePath": "line1", "allowedVehicles":null, "allowedDrivers":null };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let lineServiceClass = require('../'+config.services.Line.path).default;
		let lineServiceInstance = Container.get(lineServiceClass)
		Container.set(config.services.Line.name, lineServiceInstance);

		lineServiceInstance = Container.get(config.services.Line.name);
        const mock = sinon.stub(lineServiceInstance, "createLine").returns(Result.ok<ILineDTO>
        ({ 
            "key": req.body.key, 
            "name": req.body.name,
            "color": req.body.color,
            "linePaths": req.body.linePaths,
            "allowedVehicles": req.body.allowedVehicles,
            "allowedDrivers": req.body.allowedDrivers
        }));
		const ctrl = new LineController(lineServiceInstance as ILineService);

        await ctrl.createLine(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match
        ({ 
            "key": req.body.key, 
            "name": req.body.name,
            "color": req.body.color,
            "linePaths": req.body.linePaths,
            "allowedVehicles": req.body.allowedVehicles,
            "allowedDrivers": req.body.allowedDrivers
        }));
        mock.restore();
    });
});