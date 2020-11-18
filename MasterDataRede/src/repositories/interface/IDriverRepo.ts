import { Driver } from "../../domain/models/Driver";

export default interface IDriverRepo{
    save(Driver: Driver): Promise<Driver>
}