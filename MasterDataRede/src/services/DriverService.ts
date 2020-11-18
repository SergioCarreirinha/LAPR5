import { Service, Inject} from 'typedi';
import config from "../config";
import IDriverDTO from '../dto/DriverDTO/IDriverDTO';
import { Driver } from '../domain/models/Driver';
import IDriverRepo from '../repositories/interface/IDriverRepo';
import IDriverService from './interface/IDriverService';
import { DriverMap } from '../mappers/DriverMap';
import { Result } from '../core/logic/Result';

@Service()
export default class DriverService implements IDriverService {
    constructor(
        @Inject(config.repositories.Driver.name) private driverTypeRepo :  IDriverRepo
    ){}

    public async createDriver(driverDTO : IDriverDTO): Promise<Result<IDriverDTO>> {
        try {
            
            const driverType = await Driver.create(driverDTO);

            if(driverType.isFailure) {
                return Result.fail<IDriverDTO>(driverType.errorValue());
            }

            await this.driverTypeRepo.save(driverType.getValue());

            const vehicleTypeReturn = DriverMap.toDTO(driverType.getValue()) as IDriverDTO;
            return Result.ok<IDriverDTO>(vehicleTypeReturn);
        } catch (e) {
            throw e;
        }
    }
}