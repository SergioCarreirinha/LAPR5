import { VehicleType } from "../../domain/models/VehicleType";
import IVehicleTypeDTO from "../../dto/VehicleTypeDTO/IVehicleTypeDTO";
import {expect} from 'chai';

describe('Create a valid Vehicle Type', () => {

    let vehicleType = VehicleType.create({ 
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: 1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: 12,
        emissions: 12
    }as IVehicleTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.getValue().props.key).to.equal("Teste");
    });
});

describe('Create a invalid Vehicle Type', () => {

    let vehicleType = VehicleType.create({key: ""} as IVehicleTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.error).to.equal("Must provide a key");
    });
});


describe('Create a invalid Vehicle Type', () => {

    let vehicleType = VehicleType.create({
        key: "Teste",
        name: "",
        autonomy: -30,
        cost: 1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: 12,
        emissions: 12
    } as IVehicleTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.error).to.equal("Must provide a name");
    });
});

describe('Create a invalid Vehicle Type', () => {

    let vehicleType = VehicleType.create({ 
        key: "Teste",
        name: "Autocarro",
        autonomy: -30,
        cost: 1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: 12,
        emissions: 12
    } as IVehicleTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.error).to.equal("Must provide a valid autonomy");
    });
});
describe('Create a invalid Vehicle Type', () => {

    let vehicleType = VehicleType.create({ 
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: -1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: 12,
        emissions: 12
    } as IVehicleTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.error).to.equal("Must provide a valid cost");
    });
});
describe('Create a invalid Vehicle Type', () => {

    let vehicleType = VehicleType.create({ 
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: 1234,
        averageSpeed: -21,
        energySource: 12,
        consumption: 12,
        emissions: 12
    } as IVehicleTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.error).to.equal("Must provide a valid averageSpeed");
    });
});
describe('Create a invalid Vehicle Type', () => {

    let vehicleType = VehicleType.create({ 
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: 1234,
        averageSpeed: 21,
        energySource: -12,
        consumption: 12,
        emissions: 12
    } as IVehicleTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.error).to.equal("Must provide a valid energySource");
    });
});
describe('Create a invalid Vehicle Type', () => {

    let vehicleType = VehicleType.create({ 
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: 1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: -12,
        emissions: 12
    } as IVehicleTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.error).to.equal("Must provide a valid consumption");
    });
});
describe('Create a invalid Vehicle Type', () => {

    let vehicleType = VehicleType.create({ 
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: 1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: 12,
        emissions: -12
    } as IVehicleTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.error).to.equal("Must provide a valid emission rate");
    });
});