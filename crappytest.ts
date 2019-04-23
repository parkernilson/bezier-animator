import { BezierAnimator } from './index';

var anim: BezierAnimator = new BezierAnimator();
anim.animate((value: number) => {
	console.log(value);
})
