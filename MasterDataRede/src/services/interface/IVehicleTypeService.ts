import IVehicleTypeDTO from '../../dto/VehicleTypeDTO/IVehicleTypeDTO';
import { Result } from '../../core/logic/Result';

export default interface IVehicleTypeService {
    createVehicleType(vehicleTypeDTO : IVehicleTypeDTO): Promise<Result<IVehicleTypeDTO>>;
    getAllVehicleTypes(): Promise<Result<IVehicleTypeDTO[]>>;
}