import { Request, Response, NextFunction } from 'express';

export default interface INodeController  {
    createNode(req: Request, res: Response, next: NextFunction);
}