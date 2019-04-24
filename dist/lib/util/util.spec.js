"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var util_1 = require("./util");
describe('Utility Methods', function () {
    describe('map', function () {
        it('should map 3 in [1, 5] to 8 in [1, 15]', function () {
            chai_1.expect(util_1.map(3, 1, 5, 1, 15)).to.equal(8);
        });
        it('should map 1 in [1, 5] to 1 in [1, 15]', function () {
            chai_1.expect(util_1.map(1, 1, 5, 1, 15)).to.equal(1);
        });
        it('should map 5 in [1, 5] to 15 in [1, 15]', function () {
            chai_1.expect(util_1.map(5, 1, 5, 1, 15)).to.equal(15);
        });
        it('should map -5 in [-10, 0] to 5.5 in [1, 10]', function () {
            chai_1.expect(util_1.map(-5, -10, 0, 1, 10)).to.equal(5.5);
        });
        it('should map -23 in [20, 200] to 0.2833333333333333 in [1, 4]', function () {
            chai_1.expect(util_1.map(-23, 20, 200, 1, 4)).to.be.closeTo(0.2833333333333333, 0.01);
        });
    });
});
//# sourceMappingURL=util.spec.js.map