import { Result } from "../../core/logic/Result";
import { Path } from "../../domain/models/Path";

export default interface IPathService {
    getPaths(): Promise<Result<Array<Path>>>;
}