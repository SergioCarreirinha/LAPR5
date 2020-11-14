import { Service, Inject } from 'typedi';
import config from '../config';
import { Node } from "../domain/models/Node";
import INodeRepo from './interface/INodeRepo';
import { INodePersistence } from '../persistence/interface/INodePersistence';
import { NodeMap } from '../mappers/NodeMap';
import {Document, Model} from 'mongoose';
import { Result } from '../core/logic/Result';


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
                document.capacities= node.capacities;
                await document.save();
                return node;
            }
        } catch(e){
            throw e;
        }
    }

    public async findByName(value: string): Promise<Result<Node>> {
        const query = {name: value};
        const document = await this.NodeSchema.findOne(query);

        if(document === null) {
            return Result.fail<Node>('No Node found!');
        } else {
            return Result.ok<Node>(NodeMap.toDomain(document));
        }
    }
    public async deleteByKey(value: string){
        const query = {key:value};
        await this.NodeSchema.deleteOne(query);
        const document = await this.NodeSchema.findOne(query);
        if(document === null) {
            return Result.ok<Node>(NodeMap.toDomain(document));
        } else {
            return Result.fail<Node>('Node is found!');
        }
    }

    public async findAll(): Promise<Result<Array<Node>>> {
        var document = await this.NodeSchema.find();
        var nodes=[];
        for(var i=0;i<document.length;i++){
            nodes.push(NodeMap.toDomain(document[i]));
        }

        if(document === null) {
            return Result.fail<Array<Node>>('No Node found!');
        } else {
           return Result.ok<Array<Node>>(nodes);
        }
    }
}