import { Result } from "../../core/logic/Result";
import { Line } from "../../domain/models/Line";
import { LinePath } from "../../domain/models/LinePath";

export default interface ILineRepo {
  save(line: Line): Promise<Line>;
  updateLineByName(name: string, linePath: LinePath);
  getAllLines(): Promise<Result<Array<Line>>>;
  getLineByName(line: string): Promise<Result<Line>>;
}
