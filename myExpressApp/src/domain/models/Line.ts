import { Result } from '../../core/logic/Result';
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";


interface ILine {
    description: string;
}

export class Line extends AggregateRoot<ILine> {
    
    private constructor(inter: ILine, id?: UniqueEntityID) {
        super(inter,id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }
}
