import { Inject, Service } from "typedi";
import IFileUploadService from "./interface/IFileUploadService";
import IVehicleTypeService from "./interface/IVehicleTypeService";
import IVehicleTypeDTO from "../dto/VehicleTypeDTO/IVehicleTypeDTO";
import INodeService from "./interface/INodeService";
import config from "../config";
import INodeDTO from "../dto/NodeDTO/INodeDTO";
import ILineService from "./interface/ILineService";
import ILineDTO from "../dto/LineDTO/ILineDTO";
import ILinePathsService from "./interface/ILinePathsService";
import ILinePathsDTO from "../dto/LinePathsDTO/ILinePathsDTO";
const xml2js = require("xml2js");
const fs = require("fs");
const { DOMParser } = require('xmldom');

@Service()
export default class FileUploadService implements IFileUploadService {
    constructor(
        @Inject(config.services.VehicleType.name) private vehicleTypeServiceInstance: IVehicleTypeService,
        @Inject(config.services.Node.name) private nodeServiceInstance: INodeService,
        @Inject(config.services.Line.name) private lineServiceInstance: ILineService,
        @Inject(config.services.LinePaths.name) private pathServiceInstance: ILinePathsService
    ) { }

    public async fileUpload(xml) {
        let vehicleType = this.vehicleTypeServiceInstance;
        let node = this.nodeServiceInstance;
        let line = this.lineServiceInstance;
        let path = this.pathServiceInstance;

        fs.readFile(xml, 'utf8', async function read(err, data) {
            if (err) {
                throw err;
            }
            const objects = new DOMParser().parseFromString(data);

            let parser = new xml2js.Parser({ explicitRoot: false,
                mergeAttrs: true,
                explicitArray: false,
                attrNameProcessors: [xml2js.processors.firstCharLowerCase],
                tagNameProcessors: [xml2js.processors.firstCharLowerCase],
                attrValueProcessors: [xml2js.processors.parseBooleans]
            });

            //importar VehicleTypes
            let vehicleTypes = objects.getElementsByTagName("VehicleType");
            for (var i = 0; i < vehicleTypes.length; i++) {
                parser.parseString(vehicleTypes[i], async (err, result) => {
                    try {
                        await vehicleType.createVehicleType(result as IVehicleTypeDTO);
                    } catch (e) {
                        throw e;
                    }
                });
            }

            //importar nós
            let nodes = objects.getElementsByTagName("Node");
            for (var i = 0; i < nodes.length; i++) {
                parser.parseString(nodes[i], async (err, result) => {
                    try {
                        await node.createNode(result as INodeDTO);
                    } catch (e) {
                        throw e;
                    }
                });
            }

            //importar linhas
            let lines = objects.getElementsByTagName("Line");
            for (var i = 0; i < lines.length; i++) {
                parser.parseString(lines[i], async (err, result) => {
                    try {
                        await line.createLine(result as ILineDTO);
                    } catch (e) {
                        throw e;
                    }
                });
            }

            //importar paths
            let paths = objects.getElementsByTagName("Path");
            for (var i = 0; i < paths.length; i++) {
                parser.parseString(paths[i], async (err, result) => {
                    try {
                        await path.createPaths(result as ILinePathsDTO)
                    } catch (e) {
                        throw e;
                    }
                });
            }

        });

    }
}
