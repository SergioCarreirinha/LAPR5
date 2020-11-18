import { Document, Model } from 'mongoose';
import { IDriverPersistence } from '../persistence/interface/IDriverPersistence';
import IDriverDTO from '../dto/DriverDTO/IDriverDTO';
import { DriverType } from '../domain/models/DriverType';
import { Driver } from '../domain/models/Driver';

export class DriverMap {

  public static toDTO(driver: Driver) : IDriverDTO {
    return {
        id: driver.id.toString(),
        name: driver.name,
        birthdate: driver.birthdate,
        driverLicenseNum: driver.driverLicenseNum,
        licenseExpiration: driver.licenseExpiration,
        driverTypes: driver.driverTypes
    } as IDriverDTO;
  }
    

  public static toDomain (driver: any | Model<IDriverPersistence & Document> ): Driver{
    const driverOrError = Driver.create(driver);

    driverOrError.isFailure ? console.log(driverOrError.error) : '';

    return driverOrError.isSuccess ? driverOrError.getValue() : null;
  }

  public static toPersistence (driver: Driver): any {
    return {
        id: driver.id.toString(),
        name: driver.name,
        birthdate: driver.birthdate,
        driverLicenseNum: driver.driverLicenseNum,
        licenseExpiration: driver.licenseExpiration,
        driverTypes: driver.driverTypes
    }
  }

}