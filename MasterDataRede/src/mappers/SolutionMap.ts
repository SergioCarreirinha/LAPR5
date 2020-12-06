import { Document, Model } from 'mongoose';
import { ISolutionPersistence } from '../persistence/interface/ISolutionPersistence';
import { Solution } from "../domain/models/Solution";
import ISolutionDTO from "../dto/SolutionDTO/ISolutionDTO";


export class SolutionMap {

    public static toDTO(solution: Solution) : ISolutionDTO {
      return {
        domainId: solution.id.toString(),
        source : solution.source,
        destination : solution.destination,
        path : solution.path,
        startTime : solution.startTime,
        arriveTime :solution.arriveTime
      } as ISolutionDTO;
    }
  
    public static toDomain (solution: any | Model<ISolutionPersistence & Document> ): Solution {
      const solutionOrError = Solution.create(solution);
  
      solutionOrError.isFailure ? console.log(solutionOrError.error) : '';
  
      return solutionOrError.isSuccess ? solutionOrError.getValue() : null;
    }
  
    public static toPersistence (solution: Solution): any {
      return {
        domainId: solution.id.toString(),
        source : solution.source,
        destination : solution.destination,
        path : solution.path,
        startTime : solution.startTime,
        arriveTime :solution.arriveTime
      }
    }
  
  }