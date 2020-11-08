import { Request, Response, NextFunction } from 'express';

export default interface IDriverTypeController  {
    createDriverType(req: Request, res: Response, next: NextFunction);
}