"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("@point/point");
/**
 * Represents a cubic bezier curve.
 */
var CubicBezier = /** @class */ (function () {
    function CubicBezier(control1, control2) {
        this.start = new point_1.Point(0, 0);
        this.end = new point_1.Point(1, 1);
        this.control1 = control1;
        this.control2 = control2;
    }
    CubicBezier.prototype.getValue = function (t) {
        if (t < 0)
            t = 0;
        else if (t > 1)
            t = 1;
        return (Math.pow((1 - t), 3)) * this.start.y +
            3 * Math.pow((1 - t), 2) * t * this.control1.y +
            3 * (1 - t) * Math.pow(t, 2) * this.control2.y +
            Math.pow(t, 3) * this.end.x;
    };
    return CubicBezier;
}());
exports.CubicBezier = CubicBezier;
