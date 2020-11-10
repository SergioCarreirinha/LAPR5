"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinePathsMap = void 0;
class LinePathsMap {
    static toDTO(l, tG, desc, isE, seg) {
        return {
            line: l,
            toGo: tG,
            description: desc,
            isEmpty: isE,
            segments: seg,
        };
    }
}
exports.LinePathsMap = LinePathsMap;
