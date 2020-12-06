import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import ISolutionDTO from "../../dto/SolutionDTO/ISolutionDTO";
import { SolutionID } from "./ID/SolutionID";

interface ISolution {
    source: string, 
    destination: string, 
    path: string[], 
    startTime: string, 
    arriveTime: string
}

export class Solution extends AggregateRoot<ISolution> {
    
    private constructor(inter: ISolution, id?: UniqueEntityID) {
        super(inter,id);
    }

    //GETS
    get solutionID() : SolutionID {
        return SolutionID.create(this.id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get source(): string {
        return this.props.source;
    }

    get destination(): string {
        return this.props.destination;
    }

    get path(): Array<string> {
        return this.props.path;
    }

    get startTime(): string {
        return this.props.startTime;
    }

    get arriveTime(): string {
        return this.props.arriveTime;
    }

    //SETS
    set source(value: string){
        this.props.source = value;
    }

    set destination(value: string){
        this.props.destination = value;
    }

    set path(value: string[]){
        this.props.path = value;
    }

    set startTime(value: string){
        this.props.startTime = value;
    }

    set arriveTime(value: string){
        this.props.arriveTime = value;
    }

    static create(solutionDTO: ISolutionDTO, id ?: UniqueEntityID): Result<Solution>{
        const source = solutionDTO.source;
        const destination = solutionDTO.destination;
        const path = solutionDTO.path;
        const startTime = solutionDTO.startTime; 
        const arriveTime = solutionDTO.arriveTime;


        if (!!source === false || source.length === 0 || !!destination === false || destination.length === 0 || !!path === false || path.length === 0 
            || !!startTime === false || startTime.length === 0 || !!arriveTime === false || arriveTime.length === 0) {
            return Result.fail<Solution>('Missing args!')
        } else {
            const solutionF = new Solution({source: source, destination: destination, path: path, startTime: startTime, arriveTime: arriveTime}, id);
            return Result.ok<Solution>( solutionF );
        }
    }
}