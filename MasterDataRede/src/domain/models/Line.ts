import { Result } from '../../core/logic/Result';
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Node } from './Node';
import { Path } from './Path';
import { LineID } from './ID/LineID'
import { VehicleType } from './VehicleType';
import { DriverType } from './DriverType';
import ILineDTO from '../../dto/LineDTO/ILineDTO';
import { LinePath } from './LinePath';


interface ILine {
    key: string;
    name: string;
    color: string;
    linePaths: Array<LinePath>;
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

    get key(): string {
        return this.props.key;
    }

    get name(): string {
        return this.props.name;
    }

    get color(): string {
        return this.props.color;
    }

    get linePaths(): Array<LinePath> {
        return this.props.linePaths;
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

    set key(value: string){
        this.props.key = value;
    }

    set color(value: string){
        this.props.color = value;
    }

    set linePaths(value: Array<LinePath>){
        this.props.linePaths = value;
    }

    set allowedVehicles(value: Array<VehicleType>){
        this.props.allowedVehicles = value;
    }

    set allowedDrivers(value: Array<DriverType>){
        this.props.allowedDrivers = value;
    }

    static create(lineDto: ILineDTO, id ?: UniqueEntityID): Result<Line>{
        const name = lineDto.name;
        const key = lineDto.key;
        const color = lineDto.color;
        const linePaths = lineDto.linePaths;
        const allowedVehicles = lineDto.allowedVehicles;
        const allowedDrivers = lineDto.allowedDrivers;


        if (!!name === false || name.length === 0 || !!key === false || key.length === 0) {
            return Result.fail<Line>('Make sure that name and key are not null')
        } else {
            const lineF = new Line({key: key, name: name, color: color, linePaths: linePaths, allowedVehicles: allowedVehicles, allowedDrivers: allowedDrivers}, id);
            return Result.ok<Line>( lineF );
        }
    }
}
