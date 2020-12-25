import { Request, Response, NextFunction } from 'express';

export default interface IVehicleTypeController  {
    createVehicleType(req: Request, res: Response, next: NextFunction);
    getAllVehicleTypes(req: Request, res: Response, next: NextFunction);
}