import ILineDTO from '../../dto/LineDTO/ILineDTO';
import ILinePathsDTO from '../../dto/LinePathsDTO/ILinePathsDTO';
import { Result } from '../../core/logic/Result';
import { LinePath } from '../../domain/models/LinePath';

export default interface ILinePathsService {
    createLinePaths(linePathsDTO : ILinePathsDTO): Promise<Result<ILineDTO>>;
    getLinePaths(line: string) : Promise<Result<Array<LinePath>>>;
}