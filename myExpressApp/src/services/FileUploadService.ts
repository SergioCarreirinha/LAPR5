import { Inject, Service } from "typedi";
import IFileUploadService from "./interface/IFileUploadService";
import IVehicleTypeService from "./interface/IVehicleTypeService";
import IVehicleTypeRepo from "../repositories/interface/IVehicleTypeRepo";
import IVehicleTypeDTO from "../dto/VehicleTypeDTO/IVehicleTypeDTO";
import INodeService from "./interface/INodeService";
import config from "../config";
const xml2js = require("xml2js");
const fs = require("fs");
const { DOMParser } = require('xmldom');

@Service()
export default class FileUploadService implements IFileUploadService {
    constructor(
        @Inject(config.services.VehicleType.name) private vehicleTypeServiceInstance: IVehicleTypeService
    ) {}


    public async fileUpload(xml) {

        fs.readFile(xml, 'utf8', async function read(err, data) {
            if (err) {
                throw err;
            }

            const objects = new DOMParser().parseFromString(data);
            
            let parser=new xml2js.Parser({explicitRoot:false, mergeAttrs:true, explicitArray: false, attrNameProcessors: [xml2js.processors.firstCharLowerCase]} );

            //importar VehicleTypes
            let vehicleTypes = objects.getElementsByTagName("VehicleType");
            for (var i = 0; i < vehicleTypes.length; i++) {
                parser.parseString(vehicleTypes[i], (err, result) => {
                    this.vehicleTypeServiceInstance.createVehicleType(result as IVehicleTypeDTO);
                });
            }

         /*   //importar nós
            let nodes = objects.getElementsByTagName("Nodes");
            for (var i = 0; i < nodes.length; i++) {
                parser.parseString(nodes[i], (err, result) => {
                    console.log(result);
                    nodeService.createNode(result as INodeDTO);
                });
            } */

        });

    }
}
