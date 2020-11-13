import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../config";

import { Result } from '../core/logic/Result';

import INodeService from "../services/interface/INodeService";
import NodeController from "../controllers/NodeController";
import INodeDTO from '../dto/NodeDTO/INodeDTO';
import NodeService from '../services/NodeService';

describe('role controller', function () {
	beforeEach(function() {
    });

    it('createNode: returns json with id+name values', async function () {
        let body = { "id": "8ecc1fc0-2cfb-451d-87ee-c7164bbf2ab2",
        "key": "123",
        "name": "Valavadores",
        "latitude": 46.254,
        "longitude": 50.1204,
        "shortName": "LAVDRS",
        "isDepot": true,
        "isReliefPoint": true,
        "capacities": 30 
        };

        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let nodeServiceClass = require(config.services.Node.path).default;
		let nodeServiceInstance = Container.get(nodeServiceClass)
		Container.set(config.services.Node.name, nodeServiceInstance);

		nodeServiceInstance = Container.get(config.services.Node.name);
		sinon.stub(nodeServiceInstance, "createRole").returns( Result.ok<INodeDTO>( {"key": req.body.key,
        "name": req.body.name,
        "latitude": req.body.latitude,
        "longitude": req.body.longitude,
        "shortName": req.body.shortName,
        "isDepot": req.body.isDepot,
        "isReliefPoint": req.body.isReliefPoint,
        "capacities": req.body.capacities
        }));
		const ctrl = new NodeController(nodeServiceInstance as NodeService);

		await ctrl.createNode(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"key": req.body.key,
        "name": req.body.name,
        "latitude": req.body.latitude,
        "longitude": req.body.longitude,
        "shortName": req.body.shortName,
        "isDepot": req.body.isDepot,
        "isReliefPoint": req.body.isReliefPoint,
        "capacities": req.body.capacities 
        }));
	});
});