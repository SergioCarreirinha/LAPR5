import { Request, Response, NextFunction } from 'express';

export default interface ILinesPathController  {
    createLinePaths(req: Request, res: Response, next: NextFunction);
    getLinePaths(req: Request, res: Response, next: NextFunction);

}