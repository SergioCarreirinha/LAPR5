import { Service, Inject } from 'typedi';
import { Path } from "../domain/models/Path";
import { IPathDTO }  from '../dto/PathDTO/IPathDTO';
import IPathRepo from './interface/IPathRepo';
import { IPathPersistence } from '../persistence/interface/IPathPersistence';
import { PathMap } from '../mappers/PathMap';
import {Document, Model} from 'mongoose';
import { Result } from '../core/logic/Result';


@Service()
export default class PathRepo implements IPathRepo{
    
    private models: any;

    constructor(
        @Inject('PathSchema') private PathSchema : Model<IPathPersistence & Document>
    ){}
    
    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    public async save(path: Path): Promise<Path> {
        const query = {key: path.key.toString()};
        const document = await this.PathSchema.findOne(query);
        try{
            if(document === null) {
                const rawPath: any = PathMap.toPersistence(path);
                const pathCreated = await this.PathSchema.create(rawPath);
                return PathMap.toDomain(pathCreated);
            }else{
                document.key = path.key;
                document.isEmpty = path.isEmpty;
                document.pathNodes = path.pathNodes;
                document.totalDur = path.totalDur;
                document.totalDist = path.totalDist;
                await document.save();
                return path;
            }
        } catch(e){
            throw e;
        }
    }

    public async getPaths(): Promise<Result<Array<IPathDTO>>> {
        var document = await this.PathSchema.find();
        var paths=[];
        for(var i=0;i<document.length;i++){
            paths.push(PathMap.toDTO(PathMap.toDomain(document[i])));
        }

        if(document === null) {
            return Result.fail<Array<IPathDTO>>('No Paths found!');
        } else {
           return Result.ok<Array<IPathDTO>>(paths);
        }
    }

    public async getPathByKey(key: string): Promise<Result<IPathDTO>> {
        const query = {key: key};
        const document = await this.PathSchema.findOne(query);

        if(document === null) {
            return Result.fail<IPathDTO>('No Path found!');
        } else {
           return Result.ok<IPathDTO>(document);
        }
    }

}