import { Service, Inject } from 'typedi';
import config from '../config';
import {Document, Model} from 'mongoose';
import ILineRepo from './interface/ILineRepo';
import { Line } from '../domain/models/Line';
import { ILinePersistence } from '../persistence/interface/ILinePersistence';
import { LineMap } from '../mappers/LineMap';
import { Path } from '../domain/models/Path';
import { Result } from '../core/logic/Result';


@Service()
export default class LineRepo implements ILineRepo{
    
    private models: any;

    constructor(
        @Inject('LineSchema') private LineSchema : Model<ILinePersistence & Document>
    ){}
    
    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    public async save(line: Line): Promise<Line> {
        const query = {domainId: line.id.toString()};
        const document = await this.LineSchema.findOne(query);
        try{
            if(document === null) {
                const rawLine: any = LineMap.toPersistence(line);
                const lineCreated = await this.LineSchema.create(rawLine);
                return LineMap.toDomain(lineCreated);
            }else{
                document.name = line.name;
                document.code = line.code;
                document.goPath = line.goPath;
                document.returnPath = line.returnPath;
                document.emptyPaths = line.emptyPaths;
                document.endNodes = line.endNodes;
                document.allowedVehicles = line.allowedVehicles;
                document.allowedDrivers = line.allowedDrivers;
                await document.save();
                return line;
            }
        } catch(e){
            throw e;
        }
    }

    public async updateLineByName(value: string, toGo: boolean, path: Path): Promise<Result<Line>> {
        try  {

            const query = {name: value};
            const document = await this.LineSchema.findOne(query);

            if(toGo) {
                document.goPath = path;
            } else {
                document.returnPath = path;
            }

            await document.save();
            return Result.ok<Line>(LineMap.toDomain(document));
            
        } catch (e) {
            throw e;
        }
    }


}