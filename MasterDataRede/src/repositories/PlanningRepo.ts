import { Service, Inject } from "typedi";
import { Document, Model } from "mongoose";
import IPlanningRepo from "./interface/IPlanningRepo";
import { ISolutionPersistence } from "../persistence/interface/ISolutionPersistence";
import { Solution } from "../domain/models/Solution";
import { SolutionMap } from "../mappers/SolutionMap";
import { Result } from "../core/logic/Result";
import ISolutionDTO from "../dto/SolutionDTO/ISolutionDTO";

@Service()
export default class PlanningRepo implements IPlanningRepo {

    private models: any;

    constructor(
        @Inject('SolutionSchema') private solutionSchema : Model<ISolutionPersistence & Document>
    ){}
    
    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    public async save(solution: Solution): Promise<Solution> {
        const query = {domainId: solution.id.toString()};
        const document = await this.solutionSchema.findOne(query);
        try{
            if(document === null) {
                const rawPath: any = SolutionMap.toPersistence(solution);
                const pathCreated = await this.solutionSchema.create(rawPath);
                return SolutionMap.toDomain(pathCreated);
            }else{
                return null;
            }
        } catch(e){
            throw e;
        }
    }

    public async getSolutions(): Promise<Result<Array<ISolutionDTO>>> {
        var document = await this.solutionSchema.find();
        var solutions=[];
        for(var i=0;i<document.length;i++){
            solutions.push(SolutionMap.toDTO(SolutionMap.toDomain(document[i])));
        }

        if(document === null) {
            return Result.fail<Array<ISolutionDTO>>('No Solutions found!');
        } else {
           return Result.ok<Array<ISolutionDTO>>(solutions);
        }
        
    }
}