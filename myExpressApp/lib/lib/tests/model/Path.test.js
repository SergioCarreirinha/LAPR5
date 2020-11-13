"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path_1 = require("../../src/domain/models/Path");
const Node_1 = require("../../src/domain/models/Node");
const chai_1 = require("chai");
const PathSegment_1 = require("../../src/domain/models/PathSegment");
const node1 = Node_1.Node.create({
    key: "node1",
    name: "node1",
    latitude: 1,
    longitude: 1,
    shortName: "1",
    isDepot: true,
    isReliefPoint: false,
    capacities: 1
});
const node2 = Node_1.Node.create({
    key: "node2",
    name: "node2",
    latitude: 2,
    longitude: 2,
    shortName: "2",
    isDepot: false,
    isReliefPoint: false,
    capacities: 2
});
const node3 = Node_1.Node.create({
    key: "node3",
    name: "node3",
    latitude: 3,
    longitude: 3,
    shortName: "3",
    isDepot: true,
    isReliefPoint: true,
    capacities: 3
});
const seg1 = PathSegment_1.PathSegment.create(12, //duration
12, //distance
node1.getValue(), //startNode
node2.getValue(), //endNode
1 //sequence
).getValue();
const seg2 = PathSegment_1.PathSegment.create(23, //duration
23, //distance
node2.getValue(), //startNode
node3.getValue(), //endNode
2 //sequence
).getValue();
describe('Create a valid Path', () => {
    const dto = {
        line: "2",
        toGo: true,
        description: "teste",
        isEmpty: false,
        segments: [seg1, seg2]
    };
    let path = Path_1.Path.create(dto);
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(path.getValue().props.description).to.equal("teste");
        chai_1.expect(path.getValue().props.isEmpty).to.equal(false);
        chai_1.expect(path.getValue().props.segments[0]).to.equal(seg1);
        chai_1.expect(path.getValue().props.segments[1]).to.equal(seg2);
        chai_1.expect(path.getValue().props.totalDist).to.equal(35);
        chai_1.expect(path.getValue().props.totalDur).to.equal(35);
    });
});
describe('Cant create an invalid Path with empty description', () => {
    const dtoFail = {
        line: "2",
        toGo: true,
        description: "",
        isEmpty: false,
        segments: [seg1, seg2]
    };
    let path = Path_1.Path.create(dtoFail);
    it("ensure it fails with an invalid path", () => {
        chai_1.expect(path.error).to.equal("Must provide a path description");
    });
});
describe('Cant create an invalid Path with null description', () => {
    const dtoFail = {
        line: "2",
        toGo: true,
        description: null,
        isEmpty: false,
        segments: [seg1, seg2]
    };
    let path = Path_1.Path.create(dtoFail);
    it("ensure it fails with an invalid path", () => {
        chai_1.expect(path.error).to.equal("Must provide a path description");
    });
});
