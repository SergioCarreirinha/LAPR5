import { Result } from "../../core/logic/Result";
import { Node } from "../../domain/models/Node";

export default interface INodeRepo{
    save(node: Node): Promise<Node>
    findByName(value: string): Promise<Result<Node>>;
    findAll(): Promise<Result<Array<Node>>>;
    deleteByKey(value: string): Promise<Result<Node>>;
}