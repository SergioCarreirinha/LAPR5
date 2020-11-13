"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = require("../../src/domain/models/Line");
const Path_1 = require("../../src/domain/models/Path");
const Node_1 = require("../../src/domain/models/Node");
const PathSegment_1 = require("../../src/domain/models/PathSegment");
const chai_1 = require("chai");
const DriverType_1 = require("../../src/domain/models/DriverType");
const VehicleType_1 = require("../../src/domain/models/VehicleType");
describe('Create a valid Line', () => {
    let line = Line_1.Line.create({ name: "teste", code: "teste", goPath: null, returnPath: null, emptyPaths: null, endNodes: null, allowedDrivers: null, allowedVehicles: null });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.name).to.equal("teste");
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.code).to.equal("teste");
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.goPath).to.equal(null);
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.returnPath).to.equal(null);
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.emptyPaths).to.equal(null);
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.endNodes).to.equal(null);
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.allowedDrivers).to.equal(null);
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.allowedVehicles).to.equal(null);
    });
});
describe('Create a invalid Line', () => {
    let line = Line_1.Line.create({ name: "", code: "", goPath: null, returnPath: null, emptyPaths: null, endNodes: null, allowedDrivers: null, allowedVehicles: null });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.error).to.equal("Make sure that name and code are not null");
    });
});
describe('Create a valid Line with args', () => {
    let node1 = Node_1.Node.create({ key: "123134", name: "Valavadores", latitude: 46.254, longitude: 50.1204, shortName: "LAVDRS", isDepot: true, isReliefPoint: true, capacities: 30 });
    let node2 = Node_1.Node.create({ key: "123", name: "Vals", latitude: 46.254, longitude: 50.1204, shortName: "VALDS", isDepot: true, isReliefPoint: true, capacities: 30 });
    let node3 = Node_1.Node.create({ key: "134", name: "Vadores", latitude: 46.254, longitude: 50.1204, shortName: "VDRS", isDepot: true, isReliefPoint: true, capacities: 30 });
    let pathSegment1 = PathSegment_1.PathSegment.create(6, 9, node1.getValue(), node2.getValue(), 1);
    let pathSegment2 = PathSegment_1.PathSegment.create(6, 9, node2.getValue(), node3.getValue(), 2);
    let pathSegments = new Array();
    pathSegments.push(pathSegment1.getValue(), pathSegment2.getValue());
    let goPath = Path_1.Path.create({ line: "teste", toGo: true, description: "Teste", isEmpty: false, segments: pathSegments });
    let returnPath = Path_1.Path.create({ line: "teste2", toGo: false, description: "Teste2", isEmpty: false, segments: pathSegments.reverse() });
    let endNodes = Array();
    endNodes.push(node1.getValue(), node3.getValue());
    let allowedDrivers = Array();
    let allowedVehicles = Array();
    let vehicle = VehicleType_1.VehicleType.create({ key: "teste", name: "teste", autonomy: 500000, cost: 10, averageSpeed: 10, energySource: 5, consumption: 10, emissions: 10 });
    let driver = DriverType_1.DriverType.create({ description: "teste" });
    allowedDrivers.push(driver.getValue());
    allowedVehicles.push(vehicle.getValue());
    let line = Line_1.Line.create({ name: "teste", code: "teste", goPath: goPath.getValue(), returnPath: returnPath.getValue(), emptyPaths: null, endNodes: endNodes, allowedDrivers: allowedDrivers, allowedVehicles: allowedVehicles });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.goPath).to.equal(goPath.getValue());
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.returnPath).to.equal(returnPath.getValue());
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.emptyPaths).to.equal(null);
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.endNodes).to.equal(endNodes);
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.allowedDrivers).to.equal(allowedDrivers);
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(line.getValue().props.allowedVehicles).to.equal(allowedVehicles);
    });
});
