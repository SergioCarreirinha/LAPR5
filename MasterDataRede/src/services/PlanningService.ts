import { Service, Inject } from 'typedi';
import config from "../config";
import { Result } from '../core/logic/Result';
import { Solution } from '../domain/models/Solution';
import ISolutionDTO from '../dto/SolutionDTO/ISolutionDTO';
import { SolutionMap } from '../mappers/SolutionMap';
import IPlanningRepo from '../repositories/interface/IPlanningRepo';
import IPlanningService from './interface/IPlanningService';

@Service()
export default class PlanningService implements IPlanningService {
    constructor(
        @Inject(config.repositories.Planning.name) private planningRepo: IPlanningRepo
    ) { }

    public async createSolution(solution: ISolutionDTO): Promise<Result<ISolutionDTO>> {
        try {

            const createdSolution = await Solution.create(solution);

            if (createdSolution.isFailure) {
                return Result.fail<ISolutionDTO>(createdSolution.errorValue());
            }

            await this.planningRepo.save(createdSolution.getValue());

            const solutionReturn = SolutionMap.toDTO(createdSolution.getValue()) as ISolutionDTO;
            return Result.ok<ISolutionDTO>(solutionReturn);
        } catch (e) {
            throw e;
        }
    }

    public async getSolutions() : Promise<Result<Array<ISolutionDTO>>> {
        try {
            const returned = await this.planningRepo.getSolutions();

            if (returned.isFailure) {
                return Result.fail<Array<ISolutionDTO>>("Path not found!");
            }
            return Result.ok<Array<ISolutionDTO>>(returned.getValue());
        } catch (e) {
            throw e;
        }
    }
}