import { Service, Inject } from "typedi";
import { Document, Model } from "mongoose";
import ILineRepo from "./interface/ILineRepo";
import { Line } from "../domain/models/Line";
import { ILinePersistence } from "../persistence/interface/ILinePersistence";
import { LineMap } from "../mappers/LineMap";
import { Result } from "../core/logic/Result";
import { LinePath } from "../domain/models/LinePath";
import ILineDTO from "../dto/LineDTO/ILineDTO";

@Service()
export default class LineRepo implements ILineRepo {
  private models: any;

  constructor(
    @Inject("LineSchema") private LineSchema: Model<ILinePersistence & Document>
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async save(line: Line): Promise<Line> {
    const query = { key: line.key };
    const document = await this.LineSchema.findOne(query);
    try {
      if (document === null) {
        const rawLine: any = LineMap.toPersistence(line);
        const lineCreated = await this.LineSchema.create(rawLine);
        return LineMap.toDomain(lineCreated);
      } else {
        return null;
      }
    } catch (e) {
      throw e;
    }
  }

  public async updateLineByName(value: string, linePath: LinePath): Promise<Line> {
    const query = { name: value };

    try {
      var line = await this.LineSchema.findOne(query);
      var lp = line.linePaths;
      
      if(lp == null){
          lp=new Array<LinePath>();
      }

      lp.push(linePath);
      var document = await this.LineSchema.findOneAndUpdate(query,{ linePaths: lp },{ new: true });

      return LineMap.toDomain(document);
    } catch (e) {
      throw e;
    }
  }

  public async getAllLines(): Promise<Result<ILineDTO[]>> {
    var document = await this.LineSchema.find();
    var lines = [];

    if (document === null) {
      return Result.fail<Array<ILineDTO>>("No Lines found!");
    } else {
      
      for (var i = 0; i < document.length; i++) {
        lines.push(LineMap.toDTO(LineMap.toDomain(document[i])));
      }

      return Result.ok<Array<ILineDTO>>(lines);
    }
  }

  public async getLineByName(line: string): Promise<Result<Line>> {
    const query = { name: line };

    var document = await this.LineSchema.findOne(query);

    if (document === null) {
      return Result.fail<Line>("No Line found!");
    } else {
      return Result.ok<Line>(LineMap.toDomain(document));
    }
  }
}
