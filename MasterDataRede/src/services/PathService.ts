import { Service, Inject } from 'typedi';
import config from "../config";
import { Result } from '../core/logic/Result';
import IPathRepo from '../repositories/interface/IPathRepo';
import { Path } from '../domain/models/Path';
import IPathService from './interface/IPathService';

@Service()
export default class PathService implements IPathService {
    constructor(
        @Inject(config.repositories.Path.name) private pathRepo: IPathRepo
    ) { }

    public async getPaths(): Promise<Result<Array<Path>>> {
        try {
            const returned = await this.pathRepo.getPaths();

            if (returned.isFailure) {
                return Result.fail<Array<Path>>("Path not found!");
            }
            return Result.ok<Array<Path>>(returned.getValue());
        } catch (e) {
            throw e;
        }
    }
}