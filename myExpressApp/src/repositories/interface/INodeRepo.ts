import { Node } from "../../domain/models/Node";

export default interface INodeRepo{
    save(node: Node): Promise<Node>
}