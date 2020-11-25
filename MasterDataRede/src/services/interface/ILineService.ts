import { Request } from 'express';
import { Result } from '../../core/logic/Result';
import ILineDTO from '../../dto/LineDTO/ILineDTO';

export default interface ILineService {
    createLine(LineDTO : ILineDTO): Promise<Result<ILineDTO>>;
    getAllLines(req: Request): Promise<Result<Array<ILineDTO>>>;
}