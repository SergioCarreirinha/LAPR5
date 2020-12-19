import { Request, Response, NextFunction } from 'express';

export default interface INodeController  {
    createNode(req: Request, res: Response, next: NextFunction);
    findAll(req:Request, res: Response, next: NextFunction);
    findByKey(req:Request, res: Response, next: NextFunction);
}