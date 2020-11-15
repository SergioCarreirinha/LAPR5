import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Line } from "./Line";
import { Path } from "./Path";

interface ILinePath {
    key: string;
    path: Path;
    orientation: string;
}

export class LinePath extends ValueObject<ILinePath> {
    
    private constructor(inter: ILinePath){
        super(inter);
    }

    get key(): string {
        return this.props.key;
    }

    get path(): Path {
        return this.props.path;
    }

    get orientation(): string {
        return this.props.orientation;
    }

    set key(value: string){
        this.props.key = value;
    }

    set path(value: Path){
        this.props.path = value;
    }

    set orientation(value: string){
        this.props.orientation = value;
    }

    static create(key: string, path: Path, orientation: string): Result<LinePath>{
        if(!!key === false || key == null || !!path === false || path== null || !!orientation === false || orientation === null ){
            return Result.fail<LinePath>('Must valid path info');
        }else{
            const linePath = new LinePath({key: key, path: path, orientation: orientation});
            return Result.ok<LinePath>(linePath)
        }
    }
}