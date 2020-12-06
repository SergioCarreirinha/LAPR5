import { Result } from '../../core/logic/Result';
import ISolutionDTO from '../../dto/SolutionDTO/ISolutionDTO';

export default interface IPlanningService {
    createSolution(solution : ISolutionDTO): Promise<Result<ISolutionDTO>>;
    getSolutions(): Promise<Result<Array<ISolutionDTO>>>;
}