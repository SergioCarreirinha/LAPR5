"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DriverType_1 = require("../../src/domain/models/DriverType");
const chai_1 = require("chai");
describe('Create a valid Driver Type', () => {
    let driver = DriverType_1.DriverType.create({ description: "Teste" });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(driver.getValue().props.description).to.equal("Teste");
    });
});
describe('Create a invalid Driver Type', () => {
    let driver = DriverType_1.DriverType.create({ description: "" });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(driver.error).to.equal("Must provide a description");
    });
});
