import { Service, Inject } from 'typedi';
import config from "../config";
import IVehicleTypeDTO from '../dto/VehicleTypeDTO/IVehicleTypeDTO';
import { VehicleType } from '../domain/models/VehicleType';
import IVehicleTypeRepo from '../repositories/VehicleTypeRepo';
import IVehicleTypeService from './interface/IVehicleTypeService';
import { VehicleTypeMap } from '../mappers/VehicleTypeMap';
import { Result } from '../core/logic/Result';

@Service()
export default class VehicleTypeService implements IVehicleTypeService {
    constructor(
        @Inject(config.repositories.VehicleType.name) private vehicleTypeRepo: IVehicleTypeRepo
    ) { }

    public async createVehicleType(vehicleTypeDTO: IVehicleTypeDTO): Promise<Result<IVehicleTypeDTO>> {
        try {

            const vehicleType = await VehicleType.create(vehicleTypeDTO);

            if (vehicleType.isFailure) {
                return Result.fail<IVehicleTypeDTO>(vehicleType.errorValue());
            }

            await this.vehicleTypeRepo.save(vehicleType.getValue());

            const vehicleTypeReturn = VehicleTypeMap.toDTO(vehicleType.getValue()) as IVehicleTypeDTO;
            return Result.ok<IVehicleTypeDTO>(vehicleTypeReturn);
        } catch (e) {
            throw e;
        }
    }
}