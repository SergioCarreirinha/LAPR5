import IVehicleTypeDTO from "../../dto/VehicleTypeDTO/IVehicleTypeDTO";
import { Result } from '../../core/logic/Result';
import { allowedNodeEnvironmentFlags } from "process";

export class VehicleType {

    private _name: string;
    private _fuelType: string;
    private _range: Number;
    private _costPerKm: Number;
    private _avgConsumption: Number;
    private _avgSpeed: Number;


    protected constructor(name: string, fuelType: string, range: Number, costPerKm: Number, avgConsumption: Number, avgSpeed: Number) {
        this._name = name;
        this._fuelType = fuelType;
        this._range = range;
        this._costPerKm = costPerKm;
        this._avgConsumption = avgConsumption;
        this._avgSpeed = avgSpeed;
    }

    get name(): string {
        return this._name;
    }

    get fuelType(): string {
        return this._fuelType;
    }

    get range(): Number {
        return this._range;
    }

    get costPerKm(): Number {
        return this._costPerKm;
    }

    get avgConsumption(): Number {
        return this._avgConsumption;
    }

    get avgSpeed(): Number {
        return this._avgSpeed;
    }

    set name(value: string) {
        this._name = value;
    }

    set fuelType(value: string) {
        this._fuelType = value;
    }

    set range(value: Number) {
        this._range = value;
    }

    set costPerKm(value: Number) {
        this._costPerKm = value;
    }

    set avgConsumption(value: Number) {
        this._avgConsumption = value;
    }

    set avgSpeed(value: Number) {
        this._avgSpeed = value;
    }

    static create(vehicleTypeDTO: IVehicleTypeDTO): Result<VehicleType> {
        const name = vehicleTypeDTO.name;
        const fuelType = vehicleTypeDTO.fuelType;
        const range = vehicleTypeDTO.range;
        const costPerKm = vehicleTypeDTO.costPerKm;
        const avgConsumption = vehicleTypeDTO.avgConsumption;
        const avgSpeed = vehicleTypeDTO.avgSpeed;

        if (!!name === false || name.length === 0) {
            return Result.fail<VehicleType>('Must provide a role name')
        } else {
            const roleF = new VehicleType(name, fuelType, range, costPerKm, avgConsumption, avgSpeed);
            return Result.ok<VehicleType>( roleF );
        }
    }
}