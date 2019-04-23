"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cubic_bezier_1 = require("../bezier/cubic-bezier");
var point_1 = require("../point/point");
var performance_now_1 = __importDefault(require("performance-now"));
var raf_1 = __importDefault(require("raf"));
var MILLISECONDS_PER_SECOND = 1000;
var BezierAnimator = /** @class */ (function () {
    function BezierAnimator(options) {
        this.callbacks = [];
        this.t = 0;
        this.elapsed = 0;
        options = options || {};
        this.curve = options.curve
            ? options.curve
            : new cubic_bezier_1.CubicBezier(new point_1.Point(0, 0), new point_1.Point(1, 1));
        this.duration = options.duration
            ? options.duration
            : 1 * MILLISECONDS_PER_SECOND;
    }
    BezierAnimator.prototype.registerCallback = function (callback) {
        this.callbacks.push(callback);
    };
    BezierAnimator.prototype.animate = function (callback) {
        if (callback)
            this.callbacks.push(callback);
        this.elapsed = 0;
        this.t = 0;
        this._animate();
    };
    BezierAnimator.prototype._animate = function () {
        var _this = this;
        //if the start time has not been set, then this is the first call to _animate()
        //	so we can set the start time to now
        if (!this.startTime)
            this.startTime = performance_now_1.default();
        //time since the last emission
        this.elapsed = performance_now_1.default() - this.startTime;
        if (this.elapsed < this.duration) {
            this.t = this.elapsed / this.duration;
            var value = this.curve.getValue(this.t);
            this.emit(value);
            raf_1.default(function () { _this._animate(); });
        }
        else {
            //the animation is over, because elapsed >= duration
            //reset the animator
            this.duration = 0;
            this.elapsed = 0;
            this.t = 0;
            this.startTime = undefined;
            //the last value will always be 1
            this.emit(1);
        }
    };
    /**
     * emit a value from 0 to 1 to all of the callback functions
     */
    BezierAnimator.prototype.emit = function (value) {
        for (var i = 0; i < this.callbacks.length; ++i) {
            this.callbacks[i](value);
        }
    };
    return BezierAnimator;
}());
exports.BezierAnimator = BezierAnimator;
