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

@Service()
export default class LinePathsService implements ILinePathsService {
  constructor(
    @Inject(config.repositories.Path.name) private pathRepo: IPathRepo,
    @Inject(config.repositories.Line.name) private lineRepo: ILineRepo
  ) { }

  public async createLinePaths(
    linePathsDTO: ILinePathsDTO
  ): Promise<Result<ILineDTO>> {
    try {
      const path = await Path.create(linePathsDTO);

      if (path.isFailure) {
        return Result.fail<ILineDTO>("Error on line paths");
      }

      await this.pathRepo.save(path.getValue());

      const savedLine = await this.lineRepo.updateLineByName(
        linePathsDTO.line,
        linePathsDTO.toGo,
        path.getValue()
      );

      const lineReturn = LineMap.toDTO(savedLine) as ILineDTO;
      return Result.ok<ILineDTO>(lineReturn);
    } catch (e) {
      throw e;
    }
  }

  public async getLinePaths(line: string): Promise<Result<Array<Path>>> {
    try {
      const returned = await (await this.lineRepo.getLineByName(line)).getValue();
      const array = Array<Path>();
      array.push(returned.goPath, returned.returnPath);
      const emptyPath = returned.emptyPaths;

      if (emptyPath !== null) {
        for (let i = 0; i < emptyPath.length; i++) {
          array.push(emptyPath[i]);
        }
      }

      return Result.ok<Array<Path>>(array);
    } catch (e) {
      throw e;
    }
  }
}
