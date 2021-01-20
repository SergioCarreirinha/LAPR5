import { Service, Inject } from 'typedi';
import config from '../config';
import { VehicleType } from "../domain/models/VehicleType";
import IVehicleTypeRepo from './interface/IVehicleTypeRepo';
import { IVehicleTypePersistence } from '../persistence/interface/IVehicleTypePersistence';
import { VehicleTypeMap } from '../mappers/VehicleTypeMap';
import {Document, Model} from 'mongoose';
import { Result } from '../core/logic/Result';
import IVehicleTypeDTO from '../dto/VehicleTypeDTO/IVehicleTypeDTO';


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
                return null;
            }
        } catch(e){
            throw e;
        }
    }

    public async getAllVehicleTypes(): Promise<Result<IVehicleTypeDTO[]>>{
        const document = await this.vehicleTypeSchema.find();
        var vehicleTypes = [];

        if (document === null) {
            return Result.fail<Array<IVehicleTypeDTO>>("No Vehicle Types found!");
          } else {
              
            for(var i=0; i<document.length; i++){
                vehicleTypes.push(VehicleTypeMap.toDTO(VehicleTypeMap.toDomain(document[i])));
            }

            return Result.ok<Array<IVehicleTypeDTO>>(vehicleTypes);
          }
    }
}