import { BezierCurve, CubicBezier } from '../bezier/bezier';
import { Point } from '../point/point';
import now from 'performance-now';
import requestAnimationFrame from 'raf';

const MILLISECONDS_PER_SECOND: number = 1000;

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
export class BezierAnimator {
	/** the curve from which to return animation values */
	curve: BezierCurve;
	/** the duration of the animation in milliseconds */
	duration: number;
	/**
	 * list of animation callbacks to animate for every animate() call.
	 * An animation callback takes a number parameter where 0 <= value <= 1.
	 */
	callbacks: { (value: number): void; }[] = [];

	/** a value between 0 and 1 (inclusive) that indicates the progress of the animation as a percentage */
	t: number = 0;
	/** the time that has elapsed from the begining of the animation in milliseconds */
	elapsed: number = 0;
	/** the time in milliseconds when the current animation was started */
	startTime: number | undefined;


	constructor(options?: AnimatorOptions) {
		options = options || {};

		this.curve = options.curve
			? options.curve
			: new CubicBezier(new Point(0, 0), new Point(1, 1)); //default curve

		this.duration = options.duration
			? options.duration
			: 1 * MILLISECONDS_PER_SECOND; //default duration
	}

	/**
	 * add an animation callback that will get called every time animate() is called.
	 */
	registerCallback(callback: (value: number) => void): void {
		this.callbacks.push(callback);
	}

	/**
	 * start the animation.
	 * if a callback function is passed, it is first registered as one of the animation callbacks,
	 * then the animation is started.
	 */
	animate(callback?: (value: number) => void): void {
		//if a callback was provided to this animate() call, register it first
		if(callback) this.callbacks.push(callback);

		//ensure that the animation variables are reset
		this.elapsed = 0;
		this.t = 0;
		//start the animation
		this._animate();
	}

	/**
	 * animation frame callback. emit values from animation curve to callbacks, then request animation frame.
	 */
	private _animate(): void {
		//if the start time has not been set, then this is the first call to _animate()
		//	so we can set the start time to now
		if(!this.startTime) this.startTime = now();
		//time since the last animate values emission
		this.elapsed = now() - this.startTime;

		//if the animation is not over, calculate the animation progress, then emit a value from the bezier curve
		if(this.elapsed < this.duration) {

			this.t = this.elapsed / this.duration;
			var value = this.curve.getValue(this.t);
			this.emit(value);

			//request the next animation frame
			requestAnimationFrame(() => { this._animate(); });

		} else {
			//the animation is over, because elapsed >= duration
			//  reset the animator
			this.elapsed = 0;
			this.t = 0;
			this.startTime = undefined;
			//the last value will always be 1
			this.emit(1);
		}

	}

	/**
	 * emit a value from 0 to 1 to all of the callback functions
	 */
	private emit(value: number): void {
		for(var i = 0; i < this.callbacks.length; ++i) {
			this.callbacks[i](value);
		}
	}
}
