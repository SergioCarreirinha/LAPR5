import { DriverType } from "../../domain/models/DriverType";
import IDriverTypeDTO from "../../dto/DriverTypeDTO/IDriverTypeDTO";
import {expect} from 'chai';

describe('Create a valid Driver Type', () => {

    let driver = DriverType.create({description: "Teste"} as IDriverTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(driver.getValue().props.description).to.equal("Teste");
    });
});

describe('Create a invalid Driver Type', () => {

    let driver = DriverType.create({description: ""} as IDriverTypeDTO);

    it("ensure all Parameters are well formed", () => {
        expect(driver.error).to.equal("Must provide a description");
    });
});
