import { Service, Inject } from 'typedi';
import config from '../config';
import { Node } from "../domain/models/Node";
import INodeRepo from './interface/INodeRepo';
import { INodePersistence } from '../persistence/interface/INodePersistence';
import { NodeMap } from '../mappers/NodeMap';
import {Document, Model} from 'mongoose';


@Service()
export default class NodeRepo implements INodeRepo{
    
    private models: any;

    constructor(
        @Inject('NodeSchema') private NodeSchema : Model<INodePersistence & Document>
    ){}
    
    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    public async save(node: Node): Promise<Node> {
        const query = {domainId: node.id.toString()};
        const document = await this.NodeSchema.findOne(query);
        try{
            if(document === null) {
                const rawNode: any = NodeMap.toPersistence(node);
                const NodeCreated = await this.NodeSchema.create(rawNode);
                return NodeMap.toDomain(NodeCreated);
            }else{
                document.key = node.key;
                document.name = node.name;
                document.latitude = node.latitude;
                document.longitude = node.longitude;
                document.shortName = node.shortName;
                document.isDepot = node.isDepot;
                document.isReliefPoint = node.isReliefPoint;
                await document.save();
                return node;
            }
        } catch(e){
            throw e;
        }
    }
}