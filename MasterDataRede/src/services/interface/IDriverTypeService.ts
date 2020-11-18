import IDriverTypeDTO from '../../dto/DriverTypeDTO/IDriverTypeDTO';
import { Result } from '../../core/logic/Result';

export default interface IDriverTypeService {
    createDriverType(driverTypeDTO : IDriverTypeDTO): Promise<Result<IDriverTypeDTO>>;
}