"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const NodeSchema = new mongoose.Schema({
    domainId: {
        type: String,
        unique: true
    },
    key: {
        type: String, unique: true,
        required: true
    },
    name: { type: String, required: true },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    isDepot: {
        type: Boolean,
        required: true
    },
    isReliefPoint: {
        type: Boolean,
        required: true
    }
});
exports.default = mongoose.model('Node', NodeSchema);
