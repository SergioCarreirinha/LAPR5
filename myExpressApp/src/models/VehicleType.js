const mongoose = require('mongoose');

const vehicleTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 40
    },
    fuelType: {
        type: String,
        required: true
    },
    range: {
        type: int,
        required: true
    },
    costPerKm: {
        type: float,
        required: true
    },
    avgConsumption: {
        type: float,
        required: true
    },
    avgSpeed: {
        type: float,
        required: true
    }
});

module.exports = mongoose.model('VehicleType',VehicleTypeSchema);