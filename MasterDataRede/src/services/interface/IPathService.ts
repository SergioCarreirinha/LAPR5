import { Result } from "../../core/logic/Result";
import { IPathDTO } from "../../dto/PathDTO/IPathDTO";

export default interface IPathService {
    getPaths(): Promise<Result<Array<IPathDTO>>>;
}