"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
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
    },
    capacities: {
        type: Number,
        required: true
    }
});
exports.default = mongoose.model('Node', NodeSchema);
//# sourceMappingURL=NodeSchema.js.map