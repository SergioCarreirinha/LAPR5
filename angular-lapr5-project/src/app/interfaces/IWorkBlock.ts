import { ArrayType } from "@angular/compiler";

export interface IWorkBlock {
    key: string;
    startTime: Number;
    endTime: Number;
    startNode: string;
    endNode: string;
    isCrewTravelTime: boolean;
    isActive: boolean;
    trips: Array<String>;
}