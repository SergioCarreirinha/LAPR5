import { Result } from "../../core/logic/Result";
import { Solution } from "../../domain/models/Solution";
import ISolutionDTO from "../../dto/SolutionDTO/ISolutionDTO";

export default interface IPlanningRepo{
    save(solution: Solution): Promise<Solution>;
    getSolutions(): Promise<Result<Array<ISolutionDTO>>>;
}