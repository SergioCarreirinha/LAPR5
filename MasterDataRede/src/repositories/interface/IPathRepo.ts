import { Result } from "../../core/logic/Result";
import { Path } from "../../domain/models/Path";
import { IPathDTO } from "../../dto/PathDTO/IPathDTO";

export default interface IPathRepo{
    save(Path: Path): Promise<Path>
    getPaths(): Promise<Result<Array<IPathDTO>>>;
    getPathByKey(key: string): Promise<Result<IPathDTO>>;
}