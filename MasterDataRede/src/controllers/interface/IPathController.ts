import { Request, Response, NextFunction } from 'express';

export default interface IPathController  {
    getPaths(req:Request, res: Response, next: NextFunction);
    getPathByKey(req: Request, res: Response, next: NextFunction);
}