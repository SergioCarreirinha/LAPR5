import { Document, Model } from 'mongoose';
import { IVehicleTypePersistence } from '../persistence/interface/IVehicleTypePersistence';
import IVehicleTypeDTO from '../dto/VehicleTypeDTO/IVehicleTypeDTO';
import { VehicleType } from '../domain/models/VehicleType';

export class VehicleTypeMap {

    public static toDTO(vehicleType: VehicleType) : IVehicleTypeDTO {
        return {
            name: vehicleType.name
        } as IVehicleTypeDTO;
    }

}