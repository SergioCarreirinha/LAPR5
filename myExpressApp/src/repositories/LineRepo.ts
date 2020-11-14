import { Service, Inject } from 'typedi';
import {Document, Model} from 'mongoose';
import ILineRepo from './interface/ILineRepo';
import { Line } from '../domain/models/Line';
import { ILinePersistence } from '../persistence/interface/ILinePersistence';
import { LineMap } from '../mappers/LineMap';
import { Path } from '../domain/models/Path';
import e = require('express');
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

    public async updateLineByName(value: string, toGo: boolean, path: Path): Promise<Line> {
        const query = {name: value};

        try{
            if(toGo){
                var document = await this.LineSchema.findOneAndUpdate(query, {goPath: path}, {new: true});
            }else{
                var document = await this.LineSchema.findOneAndUpdate(query, {returnPath: path}, {new: true});
            }

            return LineMap.toDomain(document);
        } catch(e){}
            throw e;    
        }

        public async getAllLines(): Promise<Result<Line[]>> {
            var document = await this.LineSchema.find();
            var lines = [];

            for(var i=0;i<document.length;i++){
                lines.push(LineMap.toDomain(document[i]));
            }

            if(document === null) {
                return Result.fail<Array<Line>>('No Lines found!');
            } else {
               return Result.ok<Array<Line>>(lines);
        }
    }

}
