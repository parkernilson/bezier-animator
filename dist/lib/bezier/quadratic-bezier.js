"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("../point/point");
/**
 * Represents a quadratic bezier curve
 */
var QuadraticBezier = /** @class */ (function () {
    function QuadraticBezier(control1) {
        this.start = new point_1.Point(0, 0);
        this.end = new point_1.Point(1, 1);
        this.control1 = control1;
    }
    /**
     * get a value from the bezier curve where 0 <= t <= 1
     */
    QuadraticBezier.prototype.getValue = function (t) {
        if (t < 0)
            t = 0;
        else if (t > 1)
            t = 1;
        return Math.pow((1 - t), 2) * this.start.y
            + 2 * (1 - t) * t * this.control1.y
            + Math.pow(t, 2) * this.end.y;
    };
    return QuadraticBezier;
}());
exports.QuadraticBezier = QuadraticBezier;
//# sourceMappingURL=quadratic-bezier.js.map