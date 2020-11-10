import { Inject } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import config from '../config/';
import IFileUploadService from '../services/FileUploadService';
import IFileUploadController from './interface/IFileUploadController';
import { Container } from 'winston';
import FileUploadService from '../services/FileUploadService';
import { Result } from '../core/logic/Result';
import VehicleTypeRepo from '../repositories/VehicleTypeRepo';
import VehicleTypeSchema from '../dataschemas/VehicleTypeSchema';
import VehicleTypeService from '../services/VehicleTypeService';

export default class FileUploadController implements IFileUploadController {
    constructor(
        @Inject(config.services.FileUpload.name) private fileUploadServiceInstance: IFileUploadService
    ) { }

    public async fileUpload(req: any, res: any, next: NextFunction){
        try {
            let call
            if (req.files) {

                //vai buscar o path do ficheiro temporario
                let xml = req.files.xml.tempFilePath;
                console.log("ola");

                call=await new FileUploadService(new VehicleTypeService(new VehicleTypeRepo(VehicleTypeSchema))).fileUpload(xml);

            } else {
                //se nao existir nada dentro do req quer dizer que o cliente não deu upload do ficheiro
                res.send({
                    status: false,
                    message: 'Error uploanding file'
                })
            }
            
            res.send({
                status: true,
                message: 'File uploaded',
                errors: call
            })

        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}