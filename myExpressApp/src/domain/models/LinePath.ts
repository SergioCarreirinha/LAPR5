import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Path } from "./Path";

interface ILinePath {
    key: string;
    path: string;
    orientation: string;
}

export class LinePath extends ValueObject<ILinePath> {
    
    private constructor(inter: ILinePath){
        super(inter);
    }

    get key(): string {
        return this.props.key;
    }

    get path(): string {
        return this.props.path;
    }

    get orientation(): string {
        return this.props.orientation;
    }

    set key(value: string){
        this.props.key = value;
    }

    set path(value: string){
        this.props.path = value;
    }

    set orientation(value: string){
        this.props.orientation = value;
    }

    static create(key: string, path: string, orientation: string): Result<LinePath>{
        if(key == null ||path== null || orientation === null ){
            return Result.fail<LinePath>('Must valid line path info');
        }else{
            const linePath = new LinePath({key: key, path: path, orientation: orientation});
            return Result.ok<LinePath>(linePath)
        }
    }
}