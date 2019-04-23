import { Point } from '../point/point';
/**
 * Represents a cubic bezier curve.
 */
export declare class CubicBezier {
    control1: Point;
    control2: Point;
    start: Point;
    end: Point;
    constructor(control1: Point, control2: Point);
    getValue(t: number): number;
}
