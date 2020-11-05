import {Router, Request, Response} from 'express';
const VehicleType = require('../../models/VehicleType');
var vehicleTypeController = require('../controllers/VehicleTypeController');

const route = Router();

export default (app: Router) => {

    app.use('/vehicleType', route);

    route.post('/create', async (req: Request, res: Response) => {
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
}