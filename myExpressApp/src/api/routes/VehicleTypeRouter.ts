const router = require('express').Router();
const VehicleType = require('../../models/VehicleType');

router.post('/create', async (req, res) => {
    const newVehicleType = new VehicleType({
        name: req.body.name
    });
    try{
        const saved = await newVehicleType.save();
        res.send(saved);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;