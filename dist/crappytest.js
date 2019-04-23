"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var anim = new index_1.BezierAnimator({
    duration: 1000,
    curve: new index_1.CubicBezier(new index_1.Point(0, 1), new index_1.Point(0, 1))
});
anim.animate(function (value) {
    console.log(value);
});
//# sourceMappingURL=crappytest.js.map