import { Result } from "../../core/logic/Result";
import { Line } from "../../domain/models/Line";
import { Path } from "../../domain/models/Path";

export default interface ILineRepo{
    save(line: Line): Promise<Line>;
    updateLineByName(name: string , toGo: boolean, path: Path);
    getAllLines(): Promise<Result<Array<Line>>>;
}