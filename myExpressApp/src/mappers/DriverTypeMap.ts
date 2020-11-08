import { Document, Model } from 'mongoose';
import { IDriverTypePersistence } from '../persistence/interface/IDriverTypePersistence';
import IDriverTypeDTO from '../dto/DriverTypeDTO/IDriverTypeDTO';
import { DriverType } from '../domain/models/DriverType';

export class DriverTypeMap {

  public static toDTO(driverType: DriverType) : IDriverTypeDTO {
    return {
      description: driverType.description,
    } as IDriverTypeDTO;
  }
    

  public static toDomain (driverType: any | Model<IDriverTypePersistence & Document> ): DriverType {
    const vehicleTypeOrError = DriverType.create(driverType);

    vehicleTypeOrError.isFailure ? console.log(vehicleTypeOrError.error) : '';

    return vehicleTypeOrError.isSuccess ? vehicleTypeOrError.getValue() : null;
  }

  public static toPersistence (driverType: DriverType): any {
    return {
      description: driverType.description,
    }
  }

}