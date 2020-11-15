import { DriverType } from "../../domain/models/DriverType";
import { LinePath } from "../../domain/models/LinePath";
import { VehicleType } from "../../domain/models/VehicleType";

export interface ILinePersistence {
    domainId: string;
    key: string;
    name: string;
    color: string;
    linePaths: Array<LinePath>;
    allowedVehicles: Array<VehicleType>;
    allowedDrivers: Array<DriverType>;
}