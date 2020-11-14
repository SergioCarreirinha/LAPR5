import { NextFunction, Request, Response } from "express";
import * as sinon from 'sinon';
import { Container } from "typedi";
import config from "../../config";
import { Result } from "../../core/logic/Result";
import ILinePathsDTO from "../../dto/LinePathsDTO/ILinePathsDTO";
import ILinePathsService from "../../services/interface/ILinePathsService";
import LinePathsController from "../LinePathsController";

describe('LinePathsController', function () {
    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('createLinePaths: returns json with line values(including paths)', async function () {
        this.timeout(50000);
        let body = {
            "line": "t",
            "toGo": true,
            "description": "linha vazia",
            "isEmpty": false,
            "segments": [["node1", "node2", 2, 4], ["node2", "node3", 4, 5]]
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let linePathsServiceClass = require('../' + config.services.LinePaths.path).default;
        let linePathsServiceInstance = Container.get(linePathsServiceClass)
        Container.set(config.services.LinePaths.name, linePathsServiceInstance);

        linePathsServiceInstance = Container.get(config.services.LinePaths.name);
        const mock = sinon.stub(linePathsServiceInstance, "createLinePaths").returns(Result.ok<ILinePathsDTO>({
            "line": req.body.line,
            "toGo": req.body.toGo,
            "description": req.body.description,
            "isEmpty": req.body.isEmpty,
            "segments": req.body.segments
        }));
        const ctrl = new LinePathsController(linePathsServiceInstance as ILinePathsService);

        await ctrl.createLinePaths(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({
            "line": req.body.line,
            "toGo": req.body.toGo,
            "description": req.body.description,
            "isEmpty": req.body.isEmpty,
            "segments": req.body.segments
        }));
        mock.restore();
    });

});