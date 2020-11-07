import { VehicleType } from "../../domain/models/VehicleType";

export default interface IVehicleTypeRepo{
    save(VehicleType: VehicleType): Promise<VehicleType>
}