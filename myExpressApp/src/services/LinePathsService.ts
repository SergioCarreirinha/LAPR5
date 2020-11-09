import { Service, Inject} from 'typedi';
import config from "../config";

import ILinePathsDTO from '../dto/LinePathsDTO/ILinePathsDTO';
import ILineDTO from '../dto/LineDTO/ILineDTO';
import { Path } from '../domain/models/Path';
import IPathRepo from '../repositories/interface/IPathRepo';
import ILineRepo from '../repositories/interface/ILineRepo';
import INodeRepo from '../repositories/interface/INodeRepo';
import ILinePathsService from './interface/ILinePathsService';
import { LineMap } from '../mappers/LineMap';
import { Result } from '../core/logic/Result';
import { PathSegment } from '../domain/models/PathSegment';

@Service()
export default class LinePathsService implements ILinePathsService {
    constructor(
        @Inject(config.repositories.Path.name) private pathRepo : IPathRepo,
        @Inject(config.repositories.Line.name) private lineRepo : ILineRepo,
        @Inject(config.repositories.Node.name) private nodeRepo : INodeRepo
    ){}

    public async createLinePaths(linePathsDTO : ILinePathsDTO): Promise<Result<ILinePathsDTO>> {
        try {
            var goPathSegments;
            var returnPathSegments;

            if(!linePathsDTO.toGo){
                goPathSegments=this.getPathfromDTO(linePathsDTO,true);
                
                if(linePathsDTO.returnPath.segments.length==0){
                    returnPathSegments=this.revertGoPath(goPathSegments);
                }else{
                    returnPathSegments= this.getPathfromDTO(linePathsDTO,false);
                }
            }

            const goPath = await Path.create(linePathsDTO,goPathSegments,true);
            const returnPath = await Path.create(linePathsDTO,returnPathSegments,false);

            if(goPath.isFailure || returnPath.isFailure) {
                return Result.fail<ILinePathsDTO>("Error on line paths");
            }

            await this.pathRepo.save(goPath.getValue());
            await this.pathRepo.save(returnPath.getValue());

            const savedLine = await this.lineRepo.updateLineById(linePathsDTO.line,goPath.getValue,returnPath.getValue);
            
            const lineReturn = LineMap.toDTO(savedLine.getValue()) as ILineDTO;
            return Result.ok<ILineDTO>(lineReturn);
        } catch (e) {
            throw e;
        }
    }

    private getPathfromDTO(linePathsDTO : ILinePathsDTO,toGo:boolean): PathSegment[]{
        var segments;

        if(toGo){ //goPath
            segments = linePathsDTO.goPath.segments;
        }else{ //returnPath
            segments = linePathsDTO.returnPath.segments;
        }
        
        var pathSegments: PathSegment[];

        for(let i=0; i<segments.length-1; i++){
            var startNode,endNode;
            try{
                startNode = this.nodeRepo.getNodeByNameAbv(segments[i][0]).getValue();
                endNode = this.nodeRepo.getNodeByNameAbv(segments[i+1][0]).getValue();
            }catch(e){
                throw e;
            }

            pathSegments[i]=PathSegment.create(segments[i],startNode.getValue(),endNode.getValue(),i+1).getValue();
        }
         return pathSegments;
    }

    private revertGoPath(goPath: PathSegment[]){
        var returnPath;
        for(let i=0; i<goPath.length;i++){
            returnPath[goPath.length-1-i].distance(goPath[i].distance);
            returnPath[goPath.length-1-i].duration(goPath[i].duration);
            returnPath[goPath.length-1-i].startNode(goPath[i].endNode);
            returnPath[goPath.length-1-i].endNode(goPath[i].startNode);
            returnPath[goPath.length-1-i].sequence(i+1);
        }
        return returnPath;
    }
}