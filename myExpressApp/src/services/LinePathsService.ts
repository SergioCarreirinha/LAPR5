import { Service, Inject } from "typedi";
import config from "../config";

import ILinePathsDTO from "../dto/LinePathsDTO/ILinePathsDTO";
import ILineDTO from "../dto/LineDTO/ILineDTO";
import { Path } from "../domain/models/Path";

import IPathRepo from "../repositories/interface/IPathRepo";
import ILineRepo from "../repositories/interface/ILineRepo";

import ILinePathsService from "./interface/ILinePathsService";

import { LineMap } from "../mappers/LineMap";
import { Result } from "../core/logic/Result";
import { LinePath } from "../domain/models/LinePath";

@Service()
export default class LinePathsService implements ILinePathsService {
  constructor(
    @Inject(config.repositories.Path.name) private pathRepo: IPathRepo,
    @Inject(config.repositories.Line.name) private lineRepo: ILineRepo
  ) { }

  public async createLinePaths(linePathsDTO: ILinePathsDTO ): Promise<Result<ILineDTO>> {
    
    try {
      const path = await Path.create(linePathsDTO);

      if (path.isFailure) {
        return Result.fail<ILineDTO>("Error on line paths");
      }

      const a = await this.pathRepo.save(path.getValue());

      if (linePathsDTO.toGo) {
        var linePath = LinePath.create("Line" + path.getValue().key, path.getValue(), "Go").getValue();
      }else {
        var linePath = LinePath.create("Line" + path.getValue().key, path.getValue(), "Return").getValue();
      }

      const savedLine = await this.lineRepo.updateLineByName(linePathsDTO.line, linePath);

      const lineReturn = LineMap.toDTO(savedLine) as ILineDTO;
      return Result.ok<ILineDTO>(lineReturn);
    } catch (e) {
      throw e;
    }
  }

  public async getLinePaths(line: string): Promise<Result<Array<LinePath>>> {
    try {
      const returned =await this.lineRepo.getLineByName(line);

      if(returned.isFailure){
        return Result.fail<Array<LinePath>>("Line not found!");
      }
      return Result.ok<Array<LinePath>>(returned.getValue().linePaths);
    } catch (e) {
      throw e;
    }
  }
}
