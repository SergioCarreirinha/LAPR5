import { Service, Inject } from 'typedi';
import { Path } from "../domain/models/Path";
import IPathRepo from './interface/IPathRepo';
import { IPathPersistence } from '../persistence/interface/IPathPersistence';
import { PathMap } from '../mappers/PathMap';
import {Document, Model} from 'mongoose';


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


}