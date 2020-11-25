import { Service, Inject } from 'typedi';
import config from "../config";
import ILineDTO from '../dto/LineDTO/ILineDTO';
import { Line } from '../domain/models/Line';
import ILineRepo from '../repositories/interface/ILineRepo';
import ILineService from './interface/ILineService';
import { LineMap } from '../mappers/LineMap';
import { Result } from '../core/logic/Result';
import { Request } from 'express';

@Service()
export default class LineService implements ILineService {
    constructor(
        @Inject(config.repositories.Line.name) private lineRepo: ILineRepo
    ) { }

    public async createLine(line: ILineDTO): Promise<Result<ILineDTO>> {
        try {

            const lineCreated = await Line.create(line);

            if (lineCreated.isFailure) {
                return Result.fail<ILineDTO>(lineCreated.errorValue());
            }

            await this.lineRepo.save(lineCreated.getValue());

            const lineReturn = LineMap.toDTO(lineCreated.getValue()) as ILineDTO;
            return Result.ok<ILineDTO>(lineReturn);
        } catch (e) {
            throw e;
        }
    }

    public async getAllLines(req: Request): Promise<Result<Array<ILineDTO>>> {

        try {
            const lines = (await this.lineRepo.getAllLines()).getValue();

            if (req.body.orderByName && req.body.orderByCode) {
                this.orderByNameAndKey(lines);

            } else if (req.body.orderByName) {
                this.orderByName(lines);

            } else if (req.body.orderByCode) {
                this.orderByKey(lines);

            }

            function filterItems(query) {
                return lines.filter(function (el) {
                    return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || el.key.toLowerCase().indexOf(query.toLowerCase()) > -1;
                })
            }

            if (req.body.search) {
                return Result.ok<Array<ILineDTO>>(filterItems(req.body.search));
            }
            return Result.ok<Array<ILineDTO>>(lines);

        } catch (e) {
            throw (e);
        }

    }

    private orderByNameAndKey(lines: ILineDTO[]) {
        lines.sort(function (a, b) {
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

    private orderByName(lines: ILineDTO[]) {
        lines.sort(function (a, b) {
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

    private orderByKey(lines: ILineDTO[]) {
        lines.sort(function (a, b) {
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