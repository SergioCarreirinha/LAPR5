import { Service, Inject } from 'typedi';
import config from "../config";
import INodeDTO from '../dto/NodeDTO/INodeDTO';
import { Node } from '../domain/models/Node';
import INodeRepo from '../repositories/NodeRepo';
import INodeService from './interface/INodeService';
import { NodeMap } from '../mappers/NodeMap';
import { Result } from '../core/logic/Result';
import { Request } from 'express';

@Service()
export default class NodeService implements INodeService {
    constructor(
        @Inject(config.repositories.Node.name) private nodeRepo: INodeRepo
    ) { }

    public async createNode(nodeDTO: INodeDTO): Promise<Result<INodeDTO>> {
        try {
            const node = await Node.create(nodeDTO);
            if (node.isFailure) {
                return Result.fail<INodeDTO>(node.errorValue());
            }

            await this.nodeRepo.save(node.getValue());

            const nodeReturn = NodeMap.toDTO(node.getValue()) as INodeDTO;
            return Result.ok<INodeDTO>(nodeReturn);
        } catch (e) {
            throw e;
        }
    }

    public async findByKey(value: string): Promise<Result<Node>> {
        console.log(value);
        try {
            const nodeToReturn = await this.nodeRepo.findByKey(value);
            return nodeToReturn;
        } catch (e) {
            throw e;
        }
    }


    public async findAll(req: Request): Promise<Result<Array<INodeDTO>>> {
        try {
            const result = await this.nodeRepo.findAll();
            const nodes = result.getValue();

            if (req.body.orderByName && req.body.orderByCode) {
                this.orderByNameAndKey(nodes);
            } else if (req.body.orderByName) {
                this.orderByName(nodes);

            } else if (req.body.orderByCode) {
                this.orderByKey(nodes);
            }
            
            function filterItems(query) {
                return nodes.filter(function (el) {
                    return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || el.key.toLowerCase().indexOf(query.toLowerCase()) > -1;
                })
            }

            if(req.body.search){
                return Result.ok<Array<INodeDTO>>(filterItems(req.body.search));
            }
            return Result.ok<Array<INodeDTO>>(nodes);
        } catch (e) {
            throw e;
        }
    }

    private orderByNameAndKey(nodes: INodeDTO[]) {
        nodes.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            else {
                if (a.key < b.key) {
                    return -1;
                } else if (a.key > b.key) {
                    return 1;
                } else {
                    return 0;
                }
            }
        })
    }

    private orderByName(nodes: INodeDTO[]) {
        nodes.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    private orderByKey(nodes: INodeDTO[]) {
        nodes.sort(function (a, b) {
            if (a.key < b.key) {
                return -1;
            } else if (a.key > b.key) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}