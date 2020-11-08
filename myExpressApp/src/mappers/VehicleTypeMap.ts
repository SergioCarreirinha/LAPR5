import { Document, Model } from 'mongoose';
import { IVehicleTypePersistence } from '../persistence/interface/IVehicleTypePersistence';
import IVehicleTypeDTO from '../dto/VehicleTypeDTO/IVehicleTypeDTO';
import { VehicleType } from '../domain/models/VehicleType';

export class VehicleTypeMap {

  public static toDTO(vehicleType: VehicleType) : IVehicleTypeDTO {
    return {
      name: vehicleType.name,
      fuelType: vehicleType.fuelType,
      range: vehicleType.range,
      costPerKm: vehicleType.costPerKm,
      avgConsumption: vehicleType.avgConsumption,
      avgSpeed: vehicleType.avgSpeed
    } as IVehicleTypeDTO;
  }
    

  public static toDomain (vehicleType: any | Model<IVehicleTypePersistence & Document> ): VehicleType {
    const vehicleTypeOrError = VehicleType.create(vehicleType);

    vehicleTypeOrError.isFailure ? console.log(vehicleTypeOrError.error) : '';

    return vehicleTypeOrError.isSuccess ? vehicleTypeOrError.getValue() : null;
  }

  public static toPersistence (vehicleType: VehicleType): any {
    return {
      name: vehicleType.name,
      fuelType: vehicleType.fuelType,
      range: vehicleType.range,
      costPerKm: vehicleType.costPerKm,
      avgConsumption: vehicleType.avgConsumption,
      avgSpeed: vehicleType.avgSpeed
    }
  }

}