import IVehicleTypeDTO from "../../dto/VehicleTypeDTO/IVehicleTypeDTO";
import { Result } from '../../core/logic/Result';
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { VehicleID } from "./ID/VehicleTypeID";

interface IVehicle {
    key: string;
    name: string;
    autonomy: Number;
    cost: Number;
    averageSpeed: Number;
    energySource: Number;
    consumption: Number;
    emissions: Number;
}

export class VehicleType extends AggregateRoot<IVehicle>{

    private constructor(inter: IVehicle, id?: UniqueEntityID) {
        super(inter,id);
    }

    get key(): string {
        return this.props.key;
    }

    get name(): string {
        return this.props.name;
    }

    get autonomy(): Number {
        return this.props.autonomy;
    }

    get cost(): Number {
        return this.props.cost;
    }

    get averageSpeed(): Number {
        return this.props.averageSpeed;
    }

    get energySource(): Number {
        return this.props.energySource;
    }

    get consumption(): Number {
        return this.props.consumption;
    }

    get emissions(): Number {
        return this.props.emissions;
    }
    get id(): UniqueEntityID {
        return this._id;
    }

    get vehicleID() : VehicleID {
        return VehicleID.create(this.id);
    }

    set key(value: string) {
        this.props.key = value;
    }

    set name(value: string) {
        this.props.name = value;
    }

    set autonomy(value: Number) {
        this.props.autonomy = value;
    }

    set cost(value: Number) {
        this.props.cost = value;
    }

    set averageSpeed(value: Number) {
        this.props.averageSpeed = value;
    }

    set energySource(value: Number) {
        this.props.energySource = value;
    }

    set consumption(value: Number) {
        this.props.consumption = value;
    }

    set emissions(value: Number) {
        this.props.emissions = value;
    }


    static create(vehicleTypeDTO: IVehicleTypeDTO, id?: UniqueEntityID): Result<VehicleType> {
        const key = vehicleTypeDTO.key;
        const name = vehicleTypeDTO.name;
        const autonomy = vehicleTypeDTO.autonomy;
        const cost = vehicleTypeDTO.cost;
        const averageSpeed = vehicleTypeDTO.averageSpeed;
        const energySource = vehicleTypeDTO.energySource;
        const consumption = vehicleTypeDTO.consumption;
        const emissions = vehicleTypeDTO.emissions;

        if (!!key === false || key.length === 0) {
            return Result.fail<VehicleType>('Must provide a key')
        } else {
            const roleF = new VehicleType({key:key, name:name, autonomy:autonomy, cost:cost, averageSpeed:averageSpeed, energySource:energySource, consumption:consumption,emissions:emissions},id);
            return Result.ok<VehicleType>( roleF );
        }
    }
}