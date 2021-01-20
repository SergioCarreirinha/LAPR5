import { Result } from "../../core/logic/Result";
import { Node } from "../../domain/models/Node";
import INodeDTO from "../../dto/NodeDTO/INodeDTO";

export default interface INodeRepo{
    save(node: Node): Promise<Node>
    findByKey(value: string): Promise<Result<Node>>;
    findByName(value: string): Promise<Result<Node>>;
    findAll(): Promise<Result<Array<INodeDTO>>>;
    deleteByKey(value: string): Promise<Result<Node>>;
}