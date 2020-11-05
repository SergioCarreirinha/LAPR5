"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser = require('body-parser');
const VehicleType = require('../../models/VehicleType');
var vehicleTypeController = require('../controllers/VehicleTypeController');
const route = express_1.Router();
exports.default = (app) => {
    app.use('/vehicleType', route);
    route.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send("AS VOSSAS MAES");
        console.log("A TUA MAE");
    }));
    route.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("AMEM");
        console.log(req.body.name);
        const newVehicleType = new VehicleType({
            name: req.body.name
        });
        try {
            const saved = yield newVehicleType.save();
            res.send(saved);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }));
};
