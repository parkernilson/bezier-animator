"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var point_1 = require("./point");
describe('Point Class', function () {
    it('should have properties x and y', function () {
        var point = new point_1.Point(1, 3);
        chai_1.expect(point).to.have.property('x').that.is.a('number');
        chai_1.expect(point).to.have.property('y').that.is.a('number');
    });
});
//# sourceMappingURL=point.spec.js.map