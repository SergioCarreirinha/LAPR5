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
        const query = {key: vehicleType.key};
        const document = await this.vehicleTypeSchema.findOne(query);
        try{
            if(document === null) {
                const rawVehicleType: any = VehicleTypeMap.toPersistence(vehicleType);
                const vehicleTypeCreated = await this.vehicleTypeSchema.create(rawVehicleType);
                return VehicleTypeMap.toDomain(vehicleTypeCreated);
            }else{
                document.key = vehicleType.key;
                document.name = vehicleType.name;
                document.autonomy = vehicleType.autonomy;
                document.cost = vehicleType.cost;
                document.averageSpeed = vehicleType.averageSpeed;
                document.energySource = vehicleType.energySource;
                document.consumption = vehicleType.consumption;
                document.emissions = vehicleType.emissions;
                await document.save();
                return vehicleType;
            }
        } catch(e){
            throw e;
        }
    }
}