import { DriverType } from "../../domain/models/DriverType";
import { Node } from "../../domain/models/Node";
import { Path } from "../../domain/models/Path";
import { VehicleType } from "../../domain/models/VehicleType";

export interface ILinePersistence {
    domainId: string;
    name: string;
    code: string;
    goPath: Path;
    returnPath: Path;
    emptyPaths: Array<Path>;
    endNodes: Array<Node>;
    allowedVehicles: Array<VehicleType>;
    allowedDrivers: Array<DriverType>;
}