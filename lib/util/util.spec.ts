import { expect } from 'chai';
import 'mocha';
import { map } from './util';

describe('Utility Methods', () => {
	describe('map', () => {
		it('should map 3 in [1, 5] to 8 in [1, 15]', () => {
			expect(map(3, 1, 5, 1, 15)).to.equal(8);
		})
		it('should map 1 in [1, 5] to 1 in [1, 15]', () => {
			expect(map(1, 1, 5, 1, 15)).to.equal(1);
		})
		it('should map 5 in [1, 5] to 15 in [1, 15]', () => {
			expect(map(5, 1, 5, 1, 15)).to.equal(15);
		})
		it('should map -5 in [-10, 0] to 5.5 in [1, 10]', () => {
			expect(map(-5, -10, 0, 1, 10)).to.equal(5.5);
		})
		it('should map -23 in [20, 200] to 0.2833333333333333 in [1, 4]', () => {
			expect(map(-23, 20, 200, 1, 4)).to.be.closeTo(0.2833333333333333, 0.01);
		})
	})
})
