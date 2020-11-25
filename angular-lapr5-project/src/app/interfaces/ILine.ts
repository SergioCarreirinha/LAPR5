import { IDriverType } from './IDriverType';
import { ILinePath } from './ILinePath';
import { IVehicleType } from './IVehicleType';

export interface ILine {
    key: string;
    name: string;
    color: string;
    linePaths: Array<ILinePath>;
    allowedDrivers: Array<IDriverType>;
    allowedVehicles: Array<IVehicleType>;
}