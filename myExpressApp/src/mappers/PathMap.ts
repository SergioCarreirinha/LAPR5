import { Document, Model } from 'mongoose';
import { IPathPersistence } from '../persistence/interface/IPathPersistence';
import { Path } from '../domain/models/Path';

export class PathMap {

  public static toDomain (path: any | Model<IPathPersistence & Document> ): Path {
    const pathOrError = Path.create(path);

    pathOrError.isFailure ? console.log(pathOrError.error) : '';

    return pathOrError.isSuccess ? pathOrError.getValue() : null;
  }

  public static toPersistence (path: Path): any {
    return {
      description : path.description,
      isEmpty : path.isEmpty,
      segments : path.segments,
      totalDur : path.totalDur,
      totalDist : path.totalDist
    }
  }

}