"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const VehicleTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    autonomy: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    averageSpeed: {
        type: Number,
        required: true
    },
    energySource: {
        type: Number,
        required: true
    },
    consumption: {
        type: Number,
        required: true
    },
    emissions: {
        type: Number,
        required: true
    }
});
exports.default = mongoose.model('VehicleType', VehicleTypeSchema);
