import { Inject, Service } from "typedi";
import IFileUploadService from "./interface/IFileUploadService";
import IVehicleTypeService from "./interface/IVehicleTypeService";
import IVehicleTypeDTO from "../dto/VehicleTypeDTO/IVehicleTypeDTO";
import INodeService from "./interface/INodeService";
import config from "../config";
const xml2js = require("xml2js");
const fs = require("fs");
const { DOMParser } = require('xmldom');

@Service()
export default class FileUploadService implements IFileUploadService {
    constructor(
        @Inject(config.services.VehicleType.name) private vehicleTypeServiceInstance: IVehicleTypeService,
        @Inject(config.services.Node.name) private nodeServiceInstance: INodeService
    ) { }

    public async fileUpload(xml) {
        let vehicleType = this.vehicleTypeServiceInstance;
        fs.readFile(xml, 'utf8', async function read(err, data) {
            if (err) {
                throw err;
            }
            const objects = new DOMParser().parseFromString(data);

            let parser = new xml2js.Parser({ explicitRoot: false, mergeAttrs: true, explicitArray: false, attrNameProcessors: [xml2js.processors.firstCharLowerCase] });

            //importar VehicleTypes
            let vehicleTypes = objects.getElementsByTagName("VehicleType");
            for (var i = 0; i < vehicleTypes.length; i++) {
                parser.parseString(vehicleTypes[i], async (err, result) => {
                    try {
                        await vehicleType.createVehicleType(result as IVehicleTypeDTO);
                    }catch (e){
                        throw e;
                    }
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
