import { Service, Inject } from 'typedi';
import config from '../config';
import { VehicleType } from "../domain/models/VehicleType";
import IVehicleTypeRepo from './interface/IVehicleTypeRepo';
import { IVehicleTypePersistence } from '../persistence/interface/IVehicleTypePersistence';
import { VehicleTypeMap } from '../mappers/VehicleTypeMap';
import {Document, Model} from 'mongoose';


@Service()
export default class VehicleTypeRepo implements IVehicleTypeRepo{
    
    private models: any;

    constructor(
        @Inject('VehicleTypeSchema') private vehicleTypeSchema : Model<IVehicleTypePersistence & Document>
    ){}
    
    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    public async save(vehicleType: VehicleType): Promise<VehicleType> {
        const query = {name: vehicleType.name};
        const document = await this.vehicleTypeSchema.findOne(query);
        try{
            if(document === null) {
                const rawVehicleType: any = VehicleTypeMap.toPersistence(vehicleType);
                const vehicleTypeCreated = await this.vehicleTypeSchema.create(rawVehicleType);
                return VehicleTypeMap.toDomain(vehicleTypeCreated);
            }else{
                document.name = vehicleType.name;
                document.fuelType = vehicleType.fuelType;
                document.range = vehicleType.range;
                document.costPerKm = vehicleType.costPerKm;
                document.avgConsumption = vehicleType.avgConsumption;
                document.avgSpeed = vehicleType.avgSpeed;
                await document.save();
                return vehicleType;
            }
        } catch(e){
            throw e;
        }
    }


}