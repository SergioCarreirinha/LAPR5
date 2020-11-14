import {VehicleType} from '../../src/domain/models/VehicleType';
import IVehicleTypeDTO from '../../src/dto/VehicleTypeDTO/IVehicleTypeDTO';
import {expect} from 'chai';

describe('Create a valid Driver Type', () => {

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

describe('Create a invalid Driver Type', () => {

    let vehicleType = VehicleType.create({key: ""} as IVehicleTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(vehicleType.error).to.equal("Must provide a key");
    });
});