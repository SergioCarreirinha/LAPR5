"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const LineSchema = new mongoose.Schema({
    domainId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        unique: true,
    },
    code: {
        type: String
    },
    goPath: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Path',
    },
    returnPath: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Path',
    },
    emptyPaths: {
        type: Array()
    },
    endNodes: {
        type: Array()
    },
    allowedVehicles: {
        type: Array()
    },
    allowedDrivers: {
        type: Array()
    }
});
exports.default = mongoose.model('Line', LineSchema);
