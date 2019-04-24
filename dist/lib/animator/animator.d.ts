import { BezierCurve } from '../bezier/bezier';
interface AnimatorOptions {
    curve?: BezierCurve;
    duration?: number;
}
/**
 * animates values by registering callbacks, then passing a value from 0 to 1
 * across the duration that map to a bezier curve.
 *
 * @author Parker Nilson
 */
export declare class BezierAnimator {
    /** the curve from which to return animation values */
    curve: BezierCurve;
    /** the duration of the animation in milliseconds */
    duration: number;
    /**
     * list of animation callbacks to animate for every animate() call.
     * An animation callback takes a number parameter where 0 <= value <= 1.
     */
    callbacks: {
        (value: number): void;
    }[];
    /** a value between 0 and 1 (inclusive) that indicates the progress of the animation as a percentage */
    t: number;
    /** the time that has elapsed from the begining of the animation in milliseconds */
    elapsed: number;
    /** the time in milliseconds when the current animation was started */
    startTime: number | undefined;
    constructor(options?: AnimatorOptions);
    /**
     * add an animation callback that will get called every time animate() is called.
     */
    registerCallback(callback: (value: number) => void): void;
    /**
     * start the animation.
     * if a callback function is passed, it is first registered as one of the animation callbacks,
     * then the animation is started.
     */
    animate(callback?: (value: number) => void): void;
    /**
     * animation frame callback. emit values from animation curve to callbacks, then request animation frame.
     */
    private _animate;
    /**
     * emit a value from 0 to 1 to all of the callback functions
     */
    private emit;
}
export {};
