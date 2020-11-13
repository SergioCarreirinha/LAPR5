"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = require("sinon");
const typedi_1 = require("typedi");
const config_1 = require("../config");
const Result_1 = require("../core/logic/Result");
const NodeController_1 = require("../controllers/NodeController");
describe('role controller', function () {
    beforeEach(function () {
    });
    it('createNode: returns json with id+name values', function () {
        return __awaiter(this, void 0, void 0, function* () {
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
            let req = {};
            req.body = body;
            let res = {
                json: sinon.spy()
            };
            let next = () => { };
            let nodeServiceClass = require(config_1.default.services.Node.path).default;
            let nodeServiceInstance = typedi_1.Container.get(nodeServiceClass);
            typedi_1.Container.set(config_1.default.services.Node.name, nodeServiceInstance);
            nodeServiceInstance = typedi_1.Container.get(config_1.default.services.Node.name);
            sinon.stub(nodeServiceInstance, "createRole").returns(Result_1.Result.ok({ "key": req.body.key,
                "name": req.body.name,
                "latitude": req.body.latitude,
                "longitude": req.body.longitude,
                "shortName": req.body.shortName,
                "isDepot": req.body.isDepot,
                "isReliefPoint": req.body.isReliefPoint,
                "capacities": req.body.capacities
            }));
            const ctrl = new NodeController_1.default(nodeServiceInstance);
            yield ctrl.createNode(req, res, next);
            sinon.assert.calledOnce(res.json);
            sinon.assert.calledWith(res.json, sinon.match({ "key": req.body.key,
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
});
