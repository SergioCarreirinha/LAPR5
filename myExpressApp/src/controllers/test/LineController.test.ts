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
        sinon.restore();   
    });

    it('createLine: returns json with line values', async function() {
        
        let body = {"name": "teste", "code": "teste", "goPath": null, "returnPath":null, "emptyPaths": null, "endNodes":null, "allowedVehicles":null, "allowedDrivers":null };
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
        sinon.stub(lineServiceInstance, "createLine").returns(Result.ok<ILineDTO>({ "name": req.body.name, 
                                                                                    "code": req.body.code,
                                                                                    "goPath": req.body.goPath,
                                                                                    "returnPath": req.body.returnPath,
                                                                                    "emptyPaths": req.body.emptyPaths,
                                                                                    "endNodes": req.body.endNodes,
                                                                                    "allowedVehicles": req.body.allowedVehicles,
                                                                                    "allowedDrivers": req.body.allowedDrivers} ));

		const ctrl = new LineController(lineServiceInstance as ILineService);

        await ctrl.createLine(<Request>req, <Response>res, <NextFunction>next);
        
		sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "name": req.body.name, "code": req.body.code, "goPath": req.body.goPath, "returnPath": req.body.returnPath, "emptyPaths": req.body.emptyPaths, "endNodes": req.body.endNodes, "allowedVehicles": req.body.allowedVehicles, "allowedDrivers": req.body.allowedDrivers}));
        
        });

});