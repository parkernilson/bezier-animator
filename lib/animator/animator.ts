import { CubicBezier } from '../bezier/cubic-bezier';
import { Point } from '../point/point';
import now from 'performance-now';
import requestAnimationFrame from 'raf';

const MILLISECONDS_PER_SECOND: number = 1000;

interface AnimatorOptions {
	curve?: CubicBezier;
	duration?: number;
}

export class BezierAnimator {
	curve: CubicBezier;
	duration: number;
	callbacks: { (value: number): void; }[] = [];

	t: number = 0;
	elapsed: number = 0;
	startTime: number | undefined;


	constructor(options?: AnimatorOptions) {
		options = options || {};

		this.curve = options.curve
			? options.curve
			: new CubicBezier(new Point(0, 0), new Point(1, 1));

		this.duration = options.duration
			? options.duration
			: 1 * MILLISECONDS_PER_SECOND;
	}

	registerCallback(callback: (value: number) => void): void {
		this.callbacks.push(callback);
	}

	animate(callback?: (value: number) => void): void {
		if(callback) this.callbacks.push(callback);

		this.elapsed = 0;
		this.t = 0;
		this._animate();
	}

	_animate(): void {
		//if the start time has not been set, then this is the first call to _animate()
		//	so we can set the start time to now
		if(!this.startTime) this.startTime = now();
		//time since the last emission
		this.elapsed = now() - this.startTime;

		if(this.elapsed < this.duration) {

			this.t = this.elapsed / this.duration;
			var value = this.curve.getValue(this.t);
			this.emit(value);

			requestAnimationFrame(() => { this._animate(); });

		} else {
			//the animation is over, because elapsed >= duration
			//reset the animator
			this.duration = 0;
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
	emit(value: number): void {
		for(var i = 0; i < this.callbacks.length; ++i) {
			this.callbacks[i](value);
		}
	}
}
