import { ArrayType } from "@angular/compiler";
import { IPopoulation } from './IPopulation';

export interface IGetSolution {
    population : Array<IPopoulation>;
    evaluation : number;
}