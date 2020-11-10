import { Service, Inject} from 'typedi';
import config from "../config";
import ILineDTO from '../dto/LineDTO/ILineDTO';
import { Line } from '../domain/models/Line';
import ILineRepo from '../repositories/interface/ILineRepo';
import ILineService from './interface/ILineService';
import { LineMap } from '../mappers/LineMap';
import { Result } from '../core/logic/Result';

@Service()
export default class LineService implements ILineService {
    constructor(
        @Inject(config.repositories.line.name) private lineRepo :  ILineRepo
    ){}

    public async createLine(line : ILineDTO): Promise<Result<ILineDTO>> {
        try {
            
            const lineCreated = await Line.create(line);

            if(lineCreated.isFailure) {
                return Result.fail<ILineDTO>(lineCreated.errorValue());
            }

            await this.lineRepo.save(lineCreated.getValue());

            const lineReturn = LineMap.toDTO(lineCreated.getValue()) as ILineDTO;
            return Result.ok<ILineDTO>(lineReturn);
        } catch (e) {
            throw e;
        }
    }
}