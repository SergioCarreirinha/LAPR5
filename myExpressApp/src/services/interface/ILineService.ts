import { Result } from '../../core/logic/Result';
import ILineDTO from '../../dto/LineDTO/ILineDTO';

export default interface ILineService {
    createLine(LineDTO : ILineDTO): Promise<Result<ILineDTO>>;
}