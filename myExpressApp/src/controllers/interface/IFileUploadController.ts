import { Request, Response, NextFunction } from 'express';

export default interface IFileUploadController  {
    fileUpload(req: Request, res: Response, next: NextFunction);
}