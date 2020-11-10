import { Service, Inject} from 'typedi';
import config from "../config";
import INodeDTO from '../dto/NodeDTO/INodeDTO';
import { Node }  from '../domain/models/Node';
import INodeRepo from '../repositories/NodeRepo';
import INodeService from './interface/INodeService';
import { NodeMap } from '../mappers/NodeMap';
import { Result } from '../core/logic/Result';

@Service()
export default class NodeService implements INodeService {
    constructor(
        @Inject(config.repositories.Node.name) private nodeRepo :  INodeRepo
    ){}

    public async createNode(nodeDTO : INodeDTO): Promise<Result<INodeDTO>> {
        try {
            const node = await Node.create(nodeDTO);
            if(node.isFailure) {
                return Result.fail<INodeDTO>(node.errorValue());
            }

            await this.nodeRepo.save(node.getValue());

            const nodeReturn = NodeMap.toDTO(node.getValue()) as INodeDTO;
            return Result.ok<INodeDTO>(nodeReturn);
        } catch (e) {
            throw e;
        }
    }

    public async findByName(value: string): Promise<Result<Node>> {
        try  {
            const nodeToReturn = await this.nodeRepo.findByName(value);

            return nodeToReturn;
        } catch (e) {
            throw e;
        }
    }
}