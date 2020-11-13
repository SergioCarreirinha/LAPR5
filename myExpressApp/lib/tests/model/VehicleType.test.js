"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VehicleType_1 = require("../../src/domain/models/VehicleType");
const chai_1 = require("chai");
describe('Create a valid Vehicle Type', () => {
    let vehicleType = VehicleType_1.VehicleType.create({
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: 1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: 12,
        emissions: 12
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(vehicleType.getValue().props.key).to.equal("Teste");
    });
});
describe('Create a invalid Vehicle Type', () => {
    let vehicleType = VehicleType_1.VehicleType.create({ key: "" });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(vehicleType.error).to.equal("Must provide a key");
    });
});
describe('Create a invalid Vehicle Type', () => {
    let vehicleType = VehicleType_1.VehicleType.create({
        key: "Teste",
        name: "",
        autonomy: -30,
        cost: 1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: 12,
        emissions: 12
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(vehicleType.error).to.equal("Must provide a name");
    });
});
describe('Create a invalid Vehicle Type', () => {
    let vehicleType = VehicleType_1.VehicleType.create({
        key: "Teste",
        name: "Autocarro",
        autonomy: -30,
        cost: 1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: 12,
        emissions: 12
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(vehicleType.error).to.equal("Must provide a valid autonomy");
    });
});
describe('Create a invalid Vehicle Type', () => {
    let vehicleType = VehicleType_1.VehicleType.create({
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: -1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: 12,
        emissions: 12
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(vehicleType.error).to.equal("Must provide a valid cost");
    });
});
describe('Create a invalid Vehicle Type', () => {
    let vehicleType = VehicleType_1.VehicleType.create({
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: 1234,
        averageSpeed: -21,
        energySource: 12,
        consumption: 12,
        emissions: 12
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(vehicleType.error).to.equal("Must provide a valid averageSpeed");
    });
});
describe('Create a invalid Vehicle Type', () => {
    let vehicleType = VehicleType_1.VehicleType.create({
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: 1234,
        averageSpeed: 21,
        energySource: -12,
        consumption: 12,
        emissions: 12
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(vehicleType.error).to.equal("Must provide a valid energySource");
    });
});
describe('Create a invalid Vehicle Type', () => {
    let vehicleType = VehicleType_1.VehicleType.create({
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: 1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: -12,
        emissions: 12
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(vehicleType.error).to.equal("Must provide a valid consumption");
    });
});
describe('Create a invalid Vehicle Type', () => {
    let vehicleType = VehicleType_1.VehicleType.create({
        key: "Teste",
        name: "Autocarro",
        autonomy: 30,
        cost: 1234,
        averageSpeed: 21,
        energySource: 12,
        consumption: 12,
        emissions: -12
    });
    it("ensure all Parameters are well formed", () => {
        chai_1.expect(vehicleType.error).to.equal("Must provide a valid emission rate");
    });
});
