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
import { PathNode } from "../domain/models/PathNode";
import INodeRepo from "../repositories/interface/INodeRepo";
import NodeService from "./NodeService";
import { LinePathsMap } from "../mappers/LinePathsMap";

@Service()
export default class LinePathsService implements ILinePathsService {
  constructor(
    @Inject(config.repositories.Path.name) private pathRepo: IPathRepo,
    @Inject(config.repositories.Line.name) private lineRepo: ILineRepo,
    @Inject(config.repositories.Node.name) private nodeRepo: INodeRepo,
  ) { }

  public async createLinePaths(linePathsDTO: ILinePathsDTO): Promise<Result<ILineDTO>> {

    const pathNodes = new Array<PathNode>();
    const reqlength = Object.keys(linePathsDTO.pathNodes).length;
    const forLoop = linePathsDTO.pathNodes;

    const firstPathNode = PathNode.create(forLoop[0][0], (await this.nodeRepo.findByName(forLoop[0][1])).getValue().key, 0, 0).getValue();
    pathNodes.push(firstPathNode);

    for (let index = 1; index < reqlength; index++) {
      const pathNode = PathNode.create(forLoop[index][0], (await this.nodeRepo.findByName(forLoop[index][1])).getValue().key, forLoop[index][2], forLoop[index][3]).getValue();
      pathNodes.push(pathNode);
    };
    const dto = LinePathsMap.toDTO(linePathsDTO.line, linePathsDTO.toGo, linePathsDTO.key, linePathsDTO.isEmpty, pathNodes);

    try {
      const path = await Path.create(dto);

      if (path.isFailure) {
        return Result.fail<ILineDTO>("Error on line paths");
      }

      const a = await this.pathRepo.save(path.getValue());

      if (linePathsDTO.toGo) {
        var linePath = LinePath.create("Line" + path.getValue().key, path.getValue().key, "Go").getValue();
      } else {
        var linePath = LinePath.create("Line" + path.getValue().key, path.getValue().key, "Return").getValue();
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
      const returned = await this.lineRepo.getLineByName(line);

      if (returned.isFailure) {
        return Result.fail<Array<LinePath>>("Line not found!");
      }
      return Result.ok<Array<LinePath>>(returned.getValue().linePaths);
    } catch (e) {
      throw e;
    }
  }

  public async createPaths(linePathsDTO: ILinePathsDTO): Promise<Result<Path>> {
    const path = await Path.create(linePathsDTO);

    if (path.isFailure) {
      return Result.fail<Path>("Error on creating a Path");
    }
    const a = await this.pathRepo.save(path.getValue());

    return Result.ok<Path>(a);
  }
}
