import { Point } from '../point/point';
import { BezierCurve } from './bezier-curve';

/**
 * Represents a quadratic bezier curve
 */
export class BezierCurve implements BezierCurve {

	control1: Point;
	start: Point;
	end: Point;

	constructor(control1: Point) {
		this.start = new Point(0, 0);
		this.end = new Point(1, 1);

		this.control1 = control1;
	}

	/**
	 * get a value from the bezier curve where 0 <= t <= 1
	 */
	getValue(t: number): number {
		if(t < 0) t = 0;
		else if(t > 1) t = 1;

		return (1 - t)**2 * this.start.y
			+ 2 * (1 - t) * t * this.control1.y
			+ t**2 * this.end.y;
	}
}
