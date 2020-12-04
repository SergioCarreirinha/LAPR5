import { Service, Inject } from 'typedi';
import config from "../config";
import { Result } from '../core/logic/Result';
import IPathRepo from '../repositories/interface/IPathRepo';
import IPathService from './interface/IPathService';
import { IPathDTO } from '../dto/PathDTO/IPathDTO';

@Service()
export default class PathService implements IPathService {
    constructor(
        @Inject(config.repositories.Path.name) private pathRepo: IPathRepo
    ) { }

    public async getPaths(): Promise<Result<Array<IPathDTO>>> {
        try {
            const returned = await this.pathRepo.getPaths();

            if (returned.isFailure) {
                return Result.fail<Array<IPathDTO>>("Path not found!");
            }
            return Result.ok<Array<IPathDTO>>(returned.getValue());
        } catch (e) {
            throw e;
        }
    }
}