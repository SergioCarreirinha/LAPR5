import { Document, Model } from 'mongoose';
import { IPathPersistence } from '../persistence/interface/IPathPersistence';
import { VehicleType } from '../domain/models/VehicleType';

export class PathMap {

  public static toDomain (vehicleType: any | Model<IPathPersistence & Document> ): VehicleType {
    const vehicleTypeOrError = VehicleType.create(vehicleType);

    vehicleTypeOrError.isFailure ? console.log(vehicleTypeOrError.error) : '';

    return vehicleTypeOrError.isSuccess ? vehicleTypeOrError.getValue() : null;
  }

  public static toPersistence (vehicleType: VehicleType): any {
    return {
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