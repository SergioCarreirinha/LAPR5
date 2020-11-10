import ILinePathsDTO from '../dto/LinePathsDTO/ILinePathsDTO';
import {PathSegment} from '../domain/models/PathSegment';
export class LinePathsMap {

  public static toDTO( l: string, tG: boolean, desc: string, isE: boolean, seg: PathSegment[]) : ILinePathsDTO {
    return {
      line: l,
      toGo: tG,
      description: desc,
      isEmpty: isE,
      segments: seg,
    } as ILinePathsDTO;
  }
}