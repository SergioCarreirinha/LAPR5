import IDriverTypeDTO from "../../dto/DriverTypeDTO/IDriverTypeDTO";
import { Result } from '../../core/logic/Result';


export class DriverType {

    private _description: string;

    protected constructor(description: string) {
        this._description = description;
    }

    get description(): string {
        return this._description;
    }
    
    set description(value: string){
        this._description = value;
    }


    static create(driverTypeDTO: IDriverTypeDTO): Result<DriverType> {
        const description = driverTypeDTO.description;

        if (!!description === false || description.length === 0) {
            return Result.fail<DriverType>('Must provide a description')
        } else {
            const roleF = new DriverType(description);
            return Result.ok<DriverType>( roleF );
        }
    }
}