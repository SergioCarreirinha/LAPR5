import ILinePathsDTO from '../dto/LinePathsDTO/ILinePathsDTO';
import {PathNode} from '../domain/models/PathNode';
export class LinePathsMap {

  public static toDTO( line: string, toGo: boolean, key: string, isEmpty: boolean, pathNodes: PathNode[]) : ILinePathsDTO {
    return {
      line: line,
      toGo: toGo,
      key: key,
      isEmpty: isEmpty,
      pathNodes: pathNodes,
    } as ILinePathsDTO;
  }
}