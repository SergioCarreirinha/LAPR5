import { Result } from '../../core/logic/Result';
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Node } from './Node';
import { Path } from './Path';
import { LineID} from './ID/LineID'
import { VehicleType } from './VehicleType';
import { DriverType } from './DriverType';
import ILineDTO from '../../dto/LineDTO/ILineDTO';


interface ILine {
    name: string;
    code: string;
    goPath: Path;
    returnPath: Path;
    emptyPaths: Array<Path>;
    endNodes: Array<Node>;
    allowedVehicles: Array<VehicleType>;
    allowedDrivers: Array<DriverType>;
}

export class Line extends AggregateRoot<ILine> {
    
    private constructor(inter: ILine, id?: UniqueEntityID) {
        super(inter,id);
    }

    //GETS
    get lineID() : LineID {
        return LineID.create(this.id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get code(): string {
        return this.props.code;
    }

    get goPath(): Path {
        return this.props.goPath;
    }

    get returnPath(): Path {
        return this.props.returnPath;
    }

    get emptyPaths(): Array<Path> {
        return this.props.emptyPaths;
    }

    get endNodes(): Array<Node> {
        return this.props.endNodes;
    }

    get allowedVehicles(): Array<VehicleType> {
        return this.props.allowedVehicles;
    }

    get allowedDrivers(): Array<DriverType> {
        return this.props.allowedDrivers;
    }

    //SETS
    set name(value: string){
        this.props.name = value;
    }

    set code(value: string){
        this.props.code = value;
    }

    set goPath(value: Path){
        this.props.goPath = value;
    }

    set returnPath(value: Path){
        this.props.returnPath = value;
    }

    set emptyPaths(value: Array<Path>){
        this.props.emptyPaths = value;
    }

    set endNodes(value: Array<Node>){
        this.props.endNodes = value;
    }

    set allowedVehicles(value: Array<VehicleType>){
        this.props.allowedVehicles = value;
    }

    set allowedDrivers(value: Array<DriverType>){
        this.props.allowedDrivers = value;
    }

    static create(lineDto: ILineDTO, id ?: UniqueEntityID): Result<Line>{
        const name = lineDto.name;
        const code = lineDto.code;
        const goPath = lineDto.goPath;
        const returnPath = lineDto.returnPath;
        const emptyPaths = lineDto.emptyPaths;
        const endNodes = lineDto.endNodes;
        const allowedVehicles = lineDto.allowedVehicles;
        const allowedDrivers = lineDto.allowedDrivers;


        if (!!name === false || name.length === 0) {
            return Result.fail<Line>('Must provide a description')
        } else {
            const roleF = new Line({name: name, code: code, goPath: goPath, returnPath: returnPath, emptyPaths: emptyPaths, endNodes: endNodes, allowedVehicles: allowedVehicles, allowedDrivers: allowedDrivers}, id);
            return Result.ok<Line>( roleF );
        }
    }
}
