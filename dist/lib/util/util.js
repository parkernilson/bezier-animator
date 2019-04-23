"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function map(value, min1, max1, min2, max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
exports.map = map;
//# sourceMappingURL=util.js.map