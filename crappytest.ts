import { BezierAnimator, CubicBezier, Point } from './index';

var anim: BezierAnimator = new BezierAnimator({
	duration: 1000,
	curve: new CubicBezier(
		new Point(0, 1),
		new Point(0, 1)
	)
});
anim.animate((value: number) => {
	console.log(value);
})
