import { Document, Model } from 'mongoose';
import { ILinePersistence }  from '../persistence/interface/ILinePersistence';
import ILineDTO from '../dto/LineDTO/ILineDTO';
import { Line } from '../domain/models/Line';

export class LineMap {

  public static toDTO(line: Line) : ILineDTO {
    return {
        name: line.name, 
        code: line.code, 
        goPath: line.goPath, 
        returnPath: line.returnPath, 
        emptyPaths: line.emptyPaths, 
        endNodes: line.endNodes, 
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
        name: line.name, 
        code: line.code, 
        goPath: line.goPath, 
        returnPath: line.returnPath, 
        emptyPaths: line.emptyPaths, 
        endNodes: line.endNodes, 
        allowedVehicles: line.allowedVehicles, 
        allowedDrivers: line.allowedDrivers
    }
  }
}