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
        sinon.restore();
    });

    it('createLinePaths: returns json with line values(including paths)', async function () {
        let body = {
            "line": "Paredes_Aguiar",
            "toGo": true,
            "key": "path",
            "isEmpty": false,
            "pathNodes": [["PathNode1","Aguiar de Sousa"], ["PathNode2", "Baltar",4,5],["PathNode3", "Besteiros",4,5]]        
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
            "key": req.body.key,
            "isEmpty": req.body.isEmpty,
            "pathNodes": req.body.pathNodes
        }));
        const ctrl = new LinePathsController(linePathsServiceInstance as ILinePathsService);

        await ctrl.createLinePaths(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({
            "line": req.body.line,
            "toGo": req.body.toGo,
            "key": req.body.key,
            "isEmpty": req.body.isEmpty,
            "pathNodes": req.body.pathNodes
        }));
    });

});