import { Document, Model } from 'mongoose';
import { ILinePersistence }  from '../persistence/interface/ILinePersistence';
import ILineDTO from '../dto/LineDTO/ILineDTO';
import { Line } from '../domain/models/Line';

export class LineMap {

  public static toDTO(line: Line) : ILineDTO {
    return {
        key: line.key,
        name: line.name,
        color: line.color,
        linePaths: line.linePaths,
        allowedVehicles: line.allowedVehicles, 
        allowedDrivers: line.allowedDrivers
    } as ILineDTO;
  }
    

  public static toDomain (line: any | Model<ILinePersistence & Document> ): Line {
    const lineOrError = Line.create(line);

    lineOrError.isFailure ? console.log(lineOrError.error) : '';

    return lineOrError.isSuccess ? lineOrError.getValue() : null;
  }

  public static toPersistence (line: Line): any {
    return {
        domainId: line.id.toString(),
        key: line.key,
        name: line.name,
        color: line.color,
        linePaths: line.linePaths,
        allowedVehicles: line.allowedVehicles, 
        allowedDrivers: line.allowedDrivers
    }
  }
}