"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../../src/domain/models/Node");
const chai_1 = require("chai");
describe('Create a valid Driver Type', () => {
    let node = Node_1.Node.create({
        "id": "8ecc1fc0-2cfb-451d-87ee-c7164bbf2ab2",
        "key": "Teste",
        "name": "Valavadores",
        "latitude": 46.254,
        "longitude": 50.1204,
        "shortName": "LAVDRS",
        "isDepot": true,
        "isReliefPoint": true,
        "capacities": 30
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(node.getValue().props.key).to.equal("Teste");
    });
});
describe('Create a invalid Driver Type', () => {
    let node = Node_1.Node.create({ key: "" });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(node.error).to.equal("Must provide a key");
    });
});
