import IVehicleTypeDTO from "../../dto/VehicleTypeDTO/IVehicleTypeDTO";
import { Result } from '../../core/logic/Result';

export class VehicleType {

    private _name: string;
    private _autonomy: Number;
    private _cost: Number;
    private _averageSpeed: Number;
    private _energySource: Number;
    private _consumption: Number;
    private _emissions: Number;


    protected constructor(name: string, autonomy: Number, cost: Number, averageSpeed: Number, energySource: Number, consumption: Number, emissions: Number) {
        this._name = name;
        this._autonomy = autonomy;
        this._cost = cost;
        this._averageSpeed = averageSpeed;
        this._energySource = energySource;
        this._consumption = consumption;
        this._emissions = emissions;
    }

    get name(): string {
        return this._name;
    }

    get autonomy(): Number {
        return this._autonomy;
    }

    get cost(): Number {
        return this._cost;
    }

    get averageSpeed(): Number {
        return this._averageSpeed;
    }

    get energySource(): Number {
        return this._energySource;
    }

    get consumption(): Number {
        return this._consumption;
    }

    get emissions(): Number {
        return this._emissions;
    }

    set name(value: string) {
        this._name = value;
    }

    set autonomy(value: Number) {
        this._autonomy = value;
    }

    set cost(value: Number) {
        this._cost = value;
    }

    set averageSpeed(value: Number) {
        this._averageSpeed = value;
    }

    set energySource(value: Number) {
        this._energySource = value;
    }

    set consumption(value: Number) {
        this._consumption = value;
    }

    set emissions(value: Number) {
        this._emissions = value;
    }


    static create(vehicleTypeDTO: IVehicleTypeDTO): Result<VehicleType> {
        const name = vehicleTypeDTO.name;
        const autonomy = vehicleTypeDTO.autonomy;
        const cost = vehicleTypeDTO.cost;
        const averageSpeed = vehicleTypeDTO.averageSpeed;
        const energySource = vehicleTypeDTO.energySource;
        const consumption = vehicleTypeDTO.consumption;
        const emissions = vehicleTypeDTO.emissions;

        if (!!name === false || name.length === 0) {
            return Result.fail<VehicleType>('Must provide a role name')
        } else {
            const roleF = new VehicleType(name, autonomy, cost, averageSpeed, energySource, consumption,emissions);
            return Result.ok<VehicleType>( roleF );
        }
    }
}