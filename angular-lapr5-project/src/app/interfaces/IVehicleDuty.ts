import { IWorkBlock } from "./IWorkBlock";

export interface IVehicleDuty {
    key: string;
    name: string;
    color: string;
    depots: string;
    workBlocks: Array<IWorkBlock>;
}