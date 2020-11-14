import {Node} from '../../src/domain/models/Node';
import INodeDTO from '../../src/dto/NodeDTO/INodeDTO';
import {expect} from 'chai';

describe('Create a valid Node', () => {

    let node = Node.create({ 
        "id": "8ecc1fc0-2cfb-451d-87ee-c7164bbf2ab2",
        "key": "Teste",
        "name": "Valavadores",
        "latitude": 46.254,
        "longitude": 50.1204,
        "shortName": "LAVDRS",
        "isDepot": true,
        "isReliefPoint": true,
        "capacities": 30 
    }as INodeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(node.getValue().props.key).to.equal("Teste");
    });
});

describe('Create a invalid Node', () => {

    let node = Node.create({key: ""} as INodeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(node.error).to.equal("Must provide a key");
    });
});