"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bezier_1 = require("../bezier/bezier");
var point_1 = require("../point/point");
var performance_now_1 = __importDefault(require("performance-now"));
var raf_1 = __importDefault(require("raf"));
var MILLISECONDS_PER_SECOND = 1000;
/**
 * animates values by registering callbacks, then passing a value from 0 to 1
 * across the duration that map to a bezier curve.
 *
 * @author Parker Nilson
 */
var BezierAnimator = /** @class */ (function () {
    function BezierAnimator(options) {
        /**
         * list of animation callbacks to animate for every animate() call.
         * An animation callback takes a number parameter where 0 <= value <= 1.
         */
        this.callbacks = [];
        /** a value between 0 and 1 (inclusive) that indicates the progress of the animation as a percentage */
        this.t = 0;
        /** the time that has elapsed from the begining of the animation in milliseconds */
        this.elapsed = 0;
        options = options || {};
        this.curve = options.curve
            ? options.curve
            : new bezier_1.CubicBezier(new point_1.Point(0, 0), new point_1.Point(1, 1)); //default curve
        this.duration = options.duration
            ? options.duration
            : 1 * MILLISECONDS_PER_SECOND; //default duration
    }
    /**
     * add an animation callback that will get called every time animate() is called.
     */
    BezierAnimator.prototype.registerCallback = function (callback) {
        this.callbacks.push(callback);
    };
    /**
     * start the animation.
     * if a callback function is passed, it is first registered as one of the animation callbacks,
     * then the animation is started.
     */
    BezierAnimator.prototype.animate = function (callback) {
        //if a callback was provided to this animate() call, register it first
        if (callback)
            this.callbacks.push(callback);
        //ensure that the animation variables are reset
        this.elapsed = 0;
        this.t = 0;
        //start the animation
        this._animate();
    };
    /**
     * animation frame callback. emit values from animation curve to callbacks, then request animation frame.
     */
    BezierAnimator.prototype._animate = function () {
        var _this = this;
        //if the start time has not been set, then this is the first call to _animate()
        //	so we can set the start time to now
        if (!this.startTime)
            this.startTime = performance_now_1.default();
        //time since the last animate values emission
        this.elapsed = performance_now_1.default() - this.startTime;
        //if the animation is not over, calculate the animation progress, then emit a value from the bezier curve
        if (this.elapsed < this.duration) {
            this.t = this.elapsed / this.duration;
            var value = this.curve.getValue(this.t);
            this.emit(value);
            //request the next animation frame
            raf_1.default(function () { _this._animate(); });
        }
        else {
            //the animation is over, because elapsed >= duration
            //  reset the animator
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
//# sourceMappingURL=animator.js.map