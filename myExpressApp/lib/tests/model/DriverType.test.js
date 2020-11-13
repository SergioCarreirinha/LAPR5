"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DriverType_1 = require("../../src/domain/models/DriverType");
describe('Create a valid Driver Type', () => {
    let driver = DriverType_1.DriverType.create({ description: "Teste" });
    it("ensure all Parameters are well formed", () => {
        expect(driver.getValue().props.description).toEqual("Teste");
    });
});
describe('Create a invalid Driver Type', () => {
    let driver = DriverType_1.DriverType.create({ description: "" });
    it("ensure all Parameters are well formed", () => {
        expect(driver.error).toEqual("Must provide a description");
    });
});
