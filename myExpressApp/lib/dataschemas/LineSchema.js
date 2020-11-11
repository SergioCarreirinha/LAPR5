"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var pathSchema = require('./PathSchema');
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
        type: pathSchema,
    },
    returnPath: {
        type: pathSchema,
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
