import { Request, Response, NextFunction } from 'express';

export default interface IDriverController  {
    createDriver(req: Request, res: Response, next: NextFunction);
}