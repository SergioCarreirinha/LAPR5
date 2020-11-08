"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const DriverTypeSchema = new mongoose.Schema({
    description: {
        type: String,
        unique: true,
        required: true
    }
});
exports.default = mongoose.model('DriverType', DriverTypeSchema);
