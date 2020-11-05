const router = require('express').Router();
const VehicleType = require('../../models/VehicleType');
const bodyParser = require('body-parser');

router.post('/create', bodyParser.json(), async (req, res) => {
    console.log(req.body.name);
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