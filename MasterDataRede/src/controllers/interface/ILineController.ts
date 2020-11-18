import { Request, Response, NextFunction } from 'express';

export default interface ILineController  {
    createLine(req: Request, res: Response, next: NextFunction);
    getAllLines(req: Request, res: Response, next: NextFunction);
}