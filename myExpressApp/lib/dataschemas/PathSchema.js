"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const PathSchema = new mongoose.Schema({
    domainId: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        unique: true,
    },
    isEmpty: {
        type: Boolean
    },
    totalDur: {
        type: Number
    },
    totalDist: {
        type: Number
    },
    segments: {
        type: Array()
    }
});
exports.default = mongoose.model('Path', PathSchema);
