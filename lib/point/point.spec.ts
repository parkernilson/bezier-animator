import { expect } from 'chai';
import 'mocha';
import { Point } from './point';

describe('Point Class', () => {
	it('should have properties x and y', () => {
		const point = new Point(1, 3);
		expect(point).to.have.property('x').that.is.a('number');
		expect(point).to.have.property('y').that.is.a('number');
	})
})
