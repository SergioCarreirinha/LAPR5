import { Result } from "../../core/logic/Result";
import { DriverType } from "../../domain/models/DriverType";

export default interface IDriverTypeRepo{
    save(DriverType: DriverType): Promise<DriverType>
    findAll(): Promise<Result<Array<DriverType>>>
}