import { Path } from "../../domain/models/Path";

export default interface IPathRepo{
    save(Path: Path): Promise<Path>
}