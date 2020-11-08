import { DriverType } from "../../domain/models/DriverType";

export default interface IDriverTypeRepo{
    save(DriverType: DriverType): Promise<DriverType>
}