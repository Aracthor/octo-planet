VertexPainter = function () {
    this.colors = [];
    this.colors.push({
        height: 0.99,
        color: new VVGL.Color(0.0, 0.0, 0.5)
    });
    this.colors.push({
        height: 1.0,
        color: new VVGL.Color(0.0, 0.5, 0.5)
    });
    this.colors.push({
        height: 1.01,
        color: new VVGL.Color(0.5, 0.5, 0.0)
    });
    this.colors.push({
        height: 1.04,
        color: new VVGL.Color(0.0, 0.5, 0.0)
    });

    this.highestColor = new VVGL.Color(0.3, 0.2, 0.0);
};

VertexPainter.prototype.paint = function (position) {
    var color = this.highestColor;
    var height = position.getNorm();
    for (var i in this.colors) {
        var data = this.colors[i];
        if (height <= data.height) {
            color = data.color;
            break;
        }
    }

    return (color);
};
