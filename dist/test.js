"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var anim = new index_1.BezierAnimator();
anim.animate(function (value) {
    console.log(value);
});
