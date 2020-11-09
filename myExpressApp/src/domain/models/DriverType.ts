import IDriverTypeDTO from "../../dto/DriverTypeDTO/IDriverTypeDTO";
import { Result } from '../../core/logic/Result';
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { DriverTypeID } from './ID/DriverTypeID';


interface IDriverType {
    description: string;
}


export class DriverType extends AggregateRoot<IDriverType>{

    private constructor(inter: IDriverType, id?: UniqueEntityID) {
        super(inter,id);
    }

    get driverTypeID() : DriverTypeID {
        return DriverTypeID.create(this.id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }
    
    get description() : string {
        return this.props.description;
    }

    set description(value: string){
        this.props.description = value;
    }


    static create(driverTypeDTO: IDriverTypeDTO, id?: UniqueEntityID): Result<DriverType> {
        const description = driverTypeDTO.description;

        if (!!description === false || description.length === 0) {
            return Result.fail<DriverType>('Must provide a description')
        } else {
            const roleF = new DriverType({description: description}, id);
            return Result.ok<DriverType>( roleF );
        }
    }
}