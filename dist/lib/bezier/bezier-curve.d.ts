import { Point } from '../point/point';
export interface BezierCurve {
    /** starting point of the curve. Usually (0,0). */
    start: Point;
    /** ending point of the curve. Usually (1,1). */
    end: Point;
    /** get a value from the bezier curve where 0 <= t <= 1 */
    getValue(t: number): number;
}
