import * as sinon from 'sinon';
import * as sinonchai from 'sinon-chai';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../../core/logic/Result';

import INodeDTO from '../../dto/NodeDTO/INodeDTO';
import NodeController from '../../controllers/NodeController';
import INodeService from '../../services/interface/INodeService';
import NodeService from '../../services/NodeService';

describe('Node Controller', function () {
	beforeEach(function() {
    });

    afterEach(function() { 
        sinon.restore();   
    });

    it('createNode: returns json with line values', async function() {
        let body = {
            "key": "Tes2342342423423te",
            "name": "Valavadores",
            "latitude": 46.254,
            "longitude": 50.1204,
            "shortName": "LAVDRS",
            "isDepot": "true",
            "isReliefPoint": "true",
            "capacities": 30 
        };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let NodeServiceClass = require('../'+config.services.Node.path).default;
		let NodeServiceInstance = Container.get(NodeServiceClass);
		Container.set(config.services.Node.name, NodeServiceInstance);

		NodeServiceInstance = Container.get(config.services.Node.name);
        const mock =sinon.stub(NodeServiceInstance, "createNode").returns(Result.ok<INodeDTO>({
            "key": req.body.key,
            "name": req.body.name,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
            "shortName": req.body.shortName,
            "isDepot": req.body.isDepot,
            "isReliefPoint": req.body.isReliefPoint,
            "capacities": req.body.capacities
        }));
		const ctrl = new NodeController(NodeServiceInstance as INodeService);
        await ctrl.createNode(<Request>req, <Response>res, <NextFunction>next);
        
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({
            "key": req.body.key,
            "name": req.body.name,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
            "shortName": req.body.shortName,
            "isDepot": req.body.isDepot,
            "isReliefPoint": req.body.isReliefPoint,
            "capacities": req.body.capacities})
        );
    });
});