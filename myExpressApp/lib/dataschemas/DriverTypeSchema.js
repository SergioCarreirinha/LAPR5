"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const DriverTypeSchema = new mongoose.Schema({
    domainId: { type: String, unique: true },
    description: { type: String, unique: true }
});
exports.default = mongoose.model('DriverType', DriverTypeSchema);
