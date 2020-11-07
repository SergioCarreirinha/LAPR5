import { Service, Inject } from 'typedi';
import { VehicleType } from "../domain/models/VehicleType";
import IVehicleTypeRepo from './interface/IVehicleTypeRepo';



export default class VehicleTypeRepo implements IVehicleTypeRepo{
    
    public async save(vehicleType: VehicleType): Promise<VehicleType> {
        console.log(vehicleType);
        return vehicleType;
    }


}