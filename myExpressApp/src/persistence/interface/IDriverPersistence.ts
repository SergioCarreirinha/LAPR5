import { DriverType } from "../../domain/models/DriverType";

export interface IDriverPersistence {
    domainId: string;
    name: string;
    birthdate: Date;
    driverLicenseNum: Number;
    licenseExpiration: Date;
    driverTypes: Array<DriverType>;
}