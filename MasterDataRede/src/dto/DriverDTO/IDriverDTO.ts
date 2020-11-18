import { DriverType } from "../../domain/models/DriverType";

export default interface IDriverDTO {
    name: string;
    birthdate: Date;
    driverLicenseNum: Number;
    licenseExpiration: Date;
    driverTypes: Array<DriverType>;
}