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
        type: Number,
        required: true
    },
    costPerKm: {
        type: Number,
        required: true
    },
    avgConsumption: {
        type: Number,
        required: true
    },
    avgSpeed: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('VehicleType',vehicleTypeSchema);