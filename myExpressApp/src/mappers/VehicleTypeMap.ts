import { Document, Model } from 'mongoose';
import { IVehicleTypePersistence } from '../persistence/interface/IVehicleTypePersistence';
import IVehicleTypeDTO from '../dto/VehicleTypeDTO/IVehicleTypeDTO';
import { VehicleType } from '../domain/models/VehicleType';

export class VehicleTypeMap {

  public static toDTO(vehicleType: VehicleType) : IVehicleTypeDTO {
    return {
      id:vehicleType.id.toString(),
      key: vehicleType.key,
      name: vehicleType.name,
      autonomy: vehicleType.autonomy,
      cost: vehicleType.cost,
      averageSpeed: vehicleType.averageSpeed,
      energySource: vehicleType.energySource,
      consumption: vehicleType.consumption,
      emissions: vehicleType.emissions,
    } as IVehicleTypeDTO;
  }
    

  public static toDomain (vehicleType: any | Model<IVehicleTypePersistence & Document> ): VehicleType {
    const vehicleTypeOrError = VehicleType.create(vehicleType);

    vehicleTypeOrError.isFailure ? console.log(vehicleTypeOrError.error) : '';

    return vehicleTypeOrError.isSuccess ? vehicleTypeOrError.getValue() : null;
  }

  public static toPersistence (vehicleType: VehicleType): any {
    return {
      domainId:vehicleType.id.toString(),
      key: vehicleType.key,
      name: vehicleType.name,
      autonomy: vehicleType.autonomy,
      cost: vehicleType.cost,
      averageSpeed: vehicleType.averageSpeed,
      energySource: vehicleType.energySource,
      consumption: vehicleType.consumption,
      emissions: vehicleType.emissions
    }
  }

}