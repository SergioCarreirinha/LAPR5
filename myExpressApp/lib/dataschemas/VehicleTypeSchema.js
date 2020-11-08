"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const VehicleTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    range: {
        type: Number,
        required: true
    },
    costPerKm: {
        type: Number,
        required: true
    },
    avgConsumption: {
        type: Number,
        required: true
    },
    avgSpeed: {
        type: Number,
        required: true
    }
});
exports.default = mongoose.model('VehicleType', VehicleTypeSchema);
