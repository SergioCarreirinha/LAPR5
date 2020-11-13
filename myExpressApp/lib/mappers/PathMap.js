"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathMap = void 0;
const Path_1 = require("../domain/models/Path");
class PathMap {
    static toDomain(path) {
        const pathOrError = Path_1.Path.create(path);
        pathOrError.isFailure ? console.log(pathOrError.error) : '';
        return pathOrError.isSuccess ? pathOrError.getValue() : null;
    }
    static toPersistence(path) {
        return {
            description: path.description,
            isEmpty: path.isEmpty,
            segments: path.segments,
            totalDur: path.totalDur,
            totalDist: path.totalDist
        };
    }
}
exports.PathMap = PathMap;
//# sourceMappingURL=PathMap.js.map