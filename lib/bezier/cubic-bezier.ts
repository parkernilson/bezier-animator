import { Point } from '../point/point';
import { BezierCurve } from './bezier-curve';

/**
 * Represents a cubic bezier curve.
 */
export class CubicBezier implements BezierCurve {

	control1: Point;
	control2: Point;
	start: Point;
	end: Point;

	constructor(control1: Point, control2: Point) {
		this.start = new Point(0, 0);
		this.end = new Point(1, 1);

		this.control1 = control1;
		this.control2 = control2;
	}

	/**
	 * get a value from the bezier curve where 0 <= t <= 1
	 */
	getValue(t: number): number {
		if(t < 0) t = 0;
		else if(t > 1) t = 1;

		return (1 - t)**3 * this.start.y
			+ 3 * (1 - t)**2 * t * this.control1.y
			+ 3 * (1 - t) * t**2 * this.control2.y
			+ t**3 * this.end.y;
	}

}
