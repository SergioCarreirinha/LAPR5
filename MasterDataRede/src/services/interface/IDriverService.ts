import IDriverDTO from '../../dto/DriverDTO/IDriverDTO';
import { Result } from '../../core/logic/Result';

export default interface IDriverService {
    createDriver(driverDTO : IDriverDTO): Promise<Result<IDriverDTO>>;
}