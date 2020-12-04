import { Result } from "../../core/logic/Result";
import { Path } from "../../domain/models/Path";

export default interface IPathRepo{
    save(Path: Path): Promise<Path>
    getPaths(): Promise<Result<Array<Path>>>;
}