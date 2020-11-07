import { Container, Service, Inject} from 'typedi';
import config from "../config";
import IVehicleTypeDTO from '../dto/VehicleTypeDTO/IVehicleTypeDTO';
import { VehicleType } from '../domain/models/VehicleType';
import IVehicleTypeRepo from '../repositories/VehicleTypeRepo';
import IVehicleTypeService from './interface/IVehicleTypeService';
import { VehicleTypeMap } from '../mappers/VehicleTypeMap';

@Service()
export default class VehicleTypeService implements IVehicleTypeService {
    constructor(
        @Inject(config.repositories.VehicleType.name) private vehicleTypeRepo :  IVehicleTypeRepo
    ){}

    public async createVehicleType(vehicleTypeDTO : IVehicleTypeDTO): Promise<IVehicleTypeDTO> {
        try {
            const vehicleType = await VehicleType.create(vehicleTypeDTO);

            if(!vehicleType) {
                return Error("Missing Data");
            }

            await this.vehicleTypeRepo.save(vehicleType);

            const vehicleTypeReturn = VehicleTypeMap.toDTO(vehicleType) as IVehicleTypeDTO;
            return vehicleTypeReturn;
        } catch (e) {
            throw e;
        }
    }
}