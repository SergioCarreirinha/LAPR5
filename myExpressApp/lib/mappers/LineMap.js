"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineMap = void 0;
const Line_1 = require("../domain/models/Line");
class LineMap {
    static toDTO(line) {
        return {
            name: line.name,
            code: line.code,
            goPath: line.goPath,
            returnPath: line.returnPath,
            emptyPaths: line.emptyPaths,
            endNodes: line.endNodes,
            allowedVehicles: line.allowedVehicles,
            allowedDrivers: line.allowedDrivers
        };
    }
    static toDomain(line) {
        const lineOrError = Line_1.Line.create(line);
        lineOrError.isFailure ? console.log(lineOrError.error) : '';
        return lineOrError.isSuccess ? lineOrError.getValue() : null;
    }
    static toPersistence(line) {
        return {
            domainId: line.id.toString(),
            name: line.name,
            code: line.code,
            goPath: line.goPath,
            returnPath: line.returnPath,
            emptyPaths: line.emptyPaths,
            endNodes: line.endNodes,
            allowedVehicles: line.allowedVehicles,
            allowedDrivers: line.allowedDrivers
        };
    }
}
exports.LineMap = LineMap;
//# sourceMappingURL=LineMap.js.map