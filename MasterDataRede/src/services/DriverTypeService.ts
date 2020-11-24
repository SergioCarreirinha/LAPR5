import { Service, Inject} from 'typedi';
import config from "../config";
import IDriverTypeDTO from '../dto/DriverTypeDTO/IDriverTypeDTO';
import { DriverType } from '../domain/models/DriverType';
import IDriverTypeRepo from '../repositories/interface/IDriverTypeRepo';
import IDriverTypeService from './interface/IDriverTypeService';
import { DriverTypeMap } from '../mappers/DriverTypeMap';
import { Result } from '../core/logic/Result';

@Service()
export default class DriverTypeService implements IDriverTypeService {
    constructor(
        @Inject(config.repositories.DriverType.name) private driverTypeRepo :  IDriverTypeRepo
    ){}

    public async createDriverType(driverTypeDTO : IDriverTypeDTO): Promise<Result<IDriverTypeDTO>> {
        try {
            
            const driverType = await DriverType.create(driverTypeDTO);

            if(driverType.isFailure) {
                return Result.fail<IDriverTypeDTO>(driverType.errorValue());
            }

            await this.driverTypeRepo.save(driverType.getValue());

            const vehicleTypeReturn = DriverTypeMap.toDTO(driverType.getValue()) as IDriverTypeDTO;
            return Result.ok<IDriverTypeDTO>(vehicleTypeReturn);
        } catch (e) {
            throw e;
        }
    }

    public async findAll(): Promise<Result<Array<IDriverTypeDTO>>> {
        try{
            const result = await this.driverTypeRepo.findAll();
            const array = result.getValue();
            const toReturn = [];
            array.forEach(element => {
                toReturn.push(DriverTypeMap.toDTO(element));
            });
            return Result.ok<Array<DriverType>>(toReturn);
        } catch (e) {
            throw e;
        }
        
    }
}