import IDriverDTO from "../../dto/DriverDTO/IDriverDTO";
import { Result } from '../../core/logic/Result';
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { DriverID } from './ID/DriverID';
import { DriverType } from "./DriverType";


interface IDriver {
    name: string;
    birthdate: Date;
    driverLicenseNum: Number;
    licenseExpiration: Date;
    driverTypes: Array<DriverType>;
}


export class Driver extends AggregateRoot<IDriver>{

    private constructor(inter: IDriver, id?: UniqueEntityID) {
        super(inter,id);
    }

    get driverID() : DriverID {
        return DriverID.create(this.id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }
    
    get name() : string {
        return this.props.name;
    }
     
    get birthdate() : Date {
        return this.props.birthdate;
    }
     
    get driverLicenseNum() : Number {
        return this.props.driverLicenseNum;
    }
     
    get licenseExpiration() : Date {
        return this.props.licenseExpiration;
    }
     
    get driverTypes() :  Array<DriverType> {
        return this.props.driverTypes;
    }

    set name(value: string){
        this.props.name = value;
    }
    set birthdate(value: Date){
        this.props.birthdate = value;
    }
    set driverLicenseNum(value: Number){
        this.props.driverLicenseNum = value;
    }
    set licenseExpiration(value: Date){
        this.props.licenseExpiration = value;
    }
    set driverTypes(value: Array<DriverType>){
        this.props.driverTypes = value;
    }


    static create(driverDTO: IDriverDTO, id?: UniqueEntityID): Result<Driver> {
        const name = driverDTO.name;
        const birthdate = driverDTO.birthdate;
        const driverLicenseNum = driverDTO.driverLicenseNum;
        const licenseExpiration = driverDTO.licenseExpiration;
        const driverTypes = driverDTO.driverTypes;

        if (!!name === false || name.length === 0) {
            return Result.fail<Driver>('Must provide a name.')
        } else {
            const roleF = new Driver({name: name, birthdate:birthdate,driverLicenseNum:driverLicenseNum,licenseExpiration:licenseExpiration,driverTypes:driverTypes}, id);
            return Result.ok<Driver>( roleF );
        }
    }
}