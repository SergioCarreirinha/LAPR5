import { PathNode } from "../../src/domain/models/PathNode";
import {expect} from 'chai';

describe('Create a valid PathNode', () => {

    let pathNode = PathNode.create("teste","node",5,5);

    it("ensure all Parameters are well formed", () => {
        expect(pathNode.getValue().key).to.equal("teste");
        expect(pathNode.getValue().node).to.equal("node");
        expect(pathNode.getValue().duration).to.equal(5);
        expect(pathNode.getValue().distance).to.equal(5);
    });
});

describe('Cant create an invalid PathNode with empty key', () => {

    let pathNode = PathNode.create(null,"node",5,5);

    it("ensure it fails with an invalid key", () => {
        expect(pathNode.error).to.equal("Must valid pathNode info");
    });
});

describe('Cant create an invalid PathNode with empty node', () => {

    let pathNode = PathNode.create("teste",null,5,5);

    it("ensure it fails with an invalid node", () => {
        expect(pathNode.error).to.equal("Must valid pathNode info");
    });
});