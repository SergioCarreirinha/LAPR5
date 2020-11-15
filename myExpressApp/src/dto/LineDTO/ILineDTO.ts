import { VehicleType } from '../../domain/models/VehicleType';
import { DriverType } from '../../domain/models/DriverType';
import { LinePath } from '../../domain/models/LinePath';

export default interface ILineDTO {
    key: string;
    name: string;
    color: string;
    linePath: Array<LinePath>;
    allowedVehicles: Array<VehicleType>;
    allowedDrivers: Array<DriverType>;
}