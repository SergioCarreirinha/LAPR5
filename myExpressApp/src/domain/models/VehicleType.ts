import IVehicleTypeDTO from "../../dto/VehicleTypeDTO/IVehicleTypeDTO";

export class VehicleType {

    private _name: string;

    protected constructor(name: string, ) {
        if (name == null) throw new Error("Error creating VehicleType");
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    static create(vehicleTypeDTO: IVehicleTypeDTO): VehicleType {
        return new VehicleType(vehicleTypeDTO.name);
    }
}