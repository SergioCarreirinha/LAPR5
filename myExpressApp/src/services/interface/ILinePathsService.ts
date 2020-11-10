import ILineDTO from '../../dto/LineDTO/ILineDTO';
import ILinePathsDTO from '../../dto/LinePathsDTO/ILinePathsDTO';
import { Result } from '../../core/logic/Result';

export default interface ILinePathsService {
    createLinePaths(linePathsDTO : ILinePathsDTO): Promise<Result<ILineDTO>>;
}