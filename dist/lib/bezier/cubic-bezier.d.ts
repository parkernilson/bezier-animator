import { Point } from '../point/point';
import { BezierCurve } from './bezier-curve';
/**
 * Represents a cubic bezier curve.
 */
export declare class CubicBezier implements BezierCurve {
    control1: Point;
    control2: Point;
    start: Point;
    end: Point;
    constructor(control1: Point, control2: Point);
    /**
     * get a value from the bezier curve where 0 <= t <= 1
     */
    getValue(t: number): number;
}
