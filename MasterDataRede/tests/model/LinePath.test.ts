import {LinePath} from '../../src/domain/models/LinePath';
import {expect} from 'chai';

describe('Create a valid LinePath', () => {

    let linePath = LinePath.create("teste","path","Go");

    it("ensure all Parameters are well formed", () => {
        expect(linePath.getValue().key).to.equal("teste");
        expect(linePath.getValue().path).to.equal("path");
        expect(linePath.getValue().orientation).to.equal("Go");
    });
});

describe('Cant create an invalid LinePath with empty key', () => {

    let linePath = LinePath.create(null,"path","Go");

    it("ensure it fails with an invalid key", () => {
        expect(linePath.error).to.equal("Must valid line path info");
    });
});

describe('Cant create an invalid LinePath with empty path', () => {

    let linePath = LinePath.create("teste",null,"Go");

    it("ensure it fails with an invalid path", () => {
        expect(linePath.error).to.equal("Must valid line path info");
    });
});

describe('Cant create an invalid LinePath with empty path', () => {

    let linePath = LinePath.create("teste","path",null);

    it("ensure it fails with an invalid orientation", () => {
        expect(linePath.error).to.equal("Must valid line path info");
    });
});