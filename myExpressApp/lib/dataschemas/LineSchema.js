"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Path_1 = require("../domain/models/Path");
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
        type: Path_1.Path
    },
    returnPath: {
        type: Path_1.Path
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
