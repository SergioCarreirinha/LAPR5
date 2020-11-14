import ILineDTO from '../../dto/LineDTO/ILineDTO';
import ILinePathsDTO from '../../dto/LinePathsDTO/ILinePathsDTO';
import { Result } from '../../core/logic/Result';
import { Path } from '../../domain/models/Path';

export default interface ILinePathsService {
    createLinePaths(linePathsDTO : ILinePathsDTO): Promise<Result<ILineDTO>>;
    getLinePaths(line: string) : Promise<Result<Array<Path>>>;
}