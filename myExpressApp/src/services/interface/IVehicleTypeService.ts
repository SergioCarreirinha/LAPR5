import IVehicleTypeDTO from '../../dto/VehicleTypeDTO/IVehicleTypeDTO'

export default interface IVehicleTypeService {
    createVehicleType(vehicleTypeDTO : IVehicleTypeDTO): Promise<IVehicleTypeDTO>;
}