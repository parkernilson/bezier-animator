import { Point } from '../point/point';
import { BezierCurve } from './bezier-curve';
/**
 * Represents a quadratic bezier curve
 */
export declare class QuadraticBezier implements BezierCurve {
    control1: Point;
    start: Point;
    end: Point;
    constructor(control1: Point);
    /**
     * get a value from the bezier curve where 0 <= t <= 1
     */
    getValue(t: number): number;
}
