HeightCalculator = function () {

};

HeightCalculator.prototype.init = function (random) {
    this.attractions = [];
    for (var i = 0; i < 50; ++i) {
        var point = new VVGL.Vec3(random.randomFloat() * 2 - 1.0, random.randomFloat() * 2 - 1.0, random.randomFloat() * 2 - 1.0);
        this.attractions.push(point);
    }
};


HeightCalculator.prototype.calcHeightAtPosition = function (position) {
    var height = -3;

    for (var i in this.attractions) {
        var point = this.attractions[i];
        var distance = VVGL.Vec3.distance(position, point);
        if (distance < 0.5) {
            height += 10.0 * (0.5 - distance);
        }
    }

    return (height);
};

HeightCalculator.prototype.calculate = function (position) {
    position.normalize();
    var height = this.calcHeightAtPosition(position);
    position.scale(1.00 + height / 1000);
    return height;
};
