import {Path} from '../../src/domain/models/Path';
import ILinePathsDTO from '../../src/dto/LinePathsDTO/ILinePathsDTO';
import INodeDTO from '../../src/dto/NodeDTO/INodeDTO';
import {Node} from '../../src/domain/models/Node';
import {expect} from 'chai';
import { PathNode } from '../../src/domain/models/PathNode';

const node1 = Node.create({
    key: "node1",
    name: "node1",
    latitude: 1,
    longitude: 1,
    shortName: "1",
    isDepot: "true",
    isReliefPoint: "false",
    capacities: 1
   } as INodeDTO);

   const node2 = Node.create({
    key: "node2",
    name: "node2",
    latitude: 2,
    longitude: 2,
    shortName: "2",
    isDepot: "false",
    isReliefPoint: "false",
    capacities: 2
   } as INodeDTO);

   const node3 = Node.create({
    key: "node3",
    name: "node3",
    latitude: 3,
    longitude: 3,
    shortName: "3",
    isDepot: "true",
    isReliefPoint: "true",
    capacities: 3
   } as INodeDTO);

   const seg1 = PathNode.create(
        "pn1", //key
        node1.getValue().key, //node
        0, //duration
        0 //distance
    ).getValue();

    const seg2 = PathNode.create(
        "pn2", //key
        node2.getValue().key, //node
        5, //duration
        5 //distance
    ).getValue();

    const seg3 = PathNode.create(
        "pn3", //key
        node3.getValue().key, //node
        5, //duration
        5 //distance
    ).getValue();

describe('Create a valid Path', () => {

    const dto={
        line: "2",
        toGo: true,
        key: "teste",
        isEmpty: false,
        pathNodes: [seg1,seg2,seg3]
        } as ILinePathsDTO;

    let path = Path.create(dto);

    it("ensure all Parameters are well formed", () => {
        expect(path.getValue().props.key).to.equal("teste");
        expect(path.getValue().props.isEmpty).to.equal(true);
        expect(path.getValue().props.pathNodes[0]).to.equal(seg1);
        expect(path.getValue().props.pathNodes[1]).to.equal(seg2);
        expect(path.getValue().props.pathNodes[2]).to.equal(seg3);
        expect(path.getValue().props.totalDur).to.equal(10);
        expect(path.getValue().props.totalDist).to.equal(10);



    });
});

describe('Cant create an invalid Path with empty key', () => {

    const dtoFail={
        line: "2",
        toGo: true,
        key: "",
        isEmpty: false,
        pathNodes: [seg1,seg2,seg3]
        } as ILinePathsDTO;

    let path = Path.create(dtoFail);

    it("ensure it fails with an invalid path", () => {
        expect(path.error).to.equal("Must provide a path key");
    });
});

describe('Cant create an invalid Path with null key', () => {

    const dtoFail={
        line: "2",
        toGo: true,
        key: null,
        isEmpty: false,
        pathNodes: [seg1,seg2,seg3]
        } as ILinePathsDTO;

    let path = Path.create(dtoFail);

    it("ensure it fails with an invalid path", () => {
        expect(path.error).to.equal("Must provide a path key");
    });
});