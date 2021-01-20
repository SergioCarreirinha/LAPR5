import { Service, Inject } from 'typedi';
import config from '../config';
import { Node } from "../domain/models/Node";
import INodeRepo from './interface/INodeRepo';
import { INodePersistence } from '../persistence/interface/INodePersistence';
import { NodeMap } from '../mappers/NodeMap';
import {Document, Model} from 'mongoose';
import { Result } from '../core/logic/Result';
import INodeDTO from '../dto/NodeDTO/INodeDTO';


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
        const query = {key: node.key};
        const document = await this.NodeSchema.findOne(query);
        try{
            if(document === null) {
                const rawNode: any = NodeMap.toPersistence(node);
                const NodeCreated = await this.NodeSchema.create(rawNode);
                return NodeMap.toDomain(NodeCreated);
            }else{
                return null;
            }
        } catch(e){
            throw e;
        }
    }

    public async findByKey(value: string): Promise<Result<Node>> {
        const query = {key: value};
        const document = await this.NodeSchema.findOne(query);

        if(document === null) {
            return Result.fail<Node>('No Node found!');
        } else {
            return Result.ok<Node>(NodeMap.toDomain(document));
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

    public async findAll(): Promise<Result<Array<INodeDTO>>> {
        var document = await this.NodeSchema.find();
        var nodes=[];
        for(var i=0;i<document.length;i++){
            nodes.push(NodeMap.toDTO(NodeMap.toDomain(document[i])));
        }

        if(document === null) {
            return Result.fail<Array<INodeDTO>>('No Node found!');
        } else {
           return Result.ok<Array<INodeDTO>>(nodes);
        }
    }
}