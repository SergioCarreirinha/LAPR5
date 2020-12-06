import { Request, Response, NextFunction } from 'express';

export default interface IPlanningController  {
    saveSolution(req:Request, res: Response, next: NextFunction);
    getSolutions(req: Request, res: Response, next: NextFunction);
}