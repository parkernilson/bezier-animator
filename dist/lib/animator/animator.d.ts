import { CubicBezier } from '@bezier/cubic-bezier';
interface AnimatorOptions {
    curve?: CubicBezier;
    duration?: number;
}
export declare class BezierAnimator {
    curve: CubicBezier;
    duration: number;
    callbacks: {
        (value: number): void;
    }[];
    t: number;
    elapsed: number;
    startTime: number | undefined;
    constructor(options?: AnimatorOptions);
    registerCallback(callback: (value: number) => void): void;
    animate(callback?: (value: number) => void): void;
    _animate(): void;
    /**
     * emit a value from 0 to 1 to all of the callback functions
     */
    emit(value: number): void;
}
export {};
