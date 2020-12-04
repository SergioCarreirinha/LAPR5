import { Request, Response, NextFunction } from 'express';

export default interface INodeController  {
    getPaths(req:Request, res: Response, next: NextFunction);
}