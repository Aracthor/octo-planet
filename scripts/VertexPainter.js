VertexPainter = function () {
    this.colors = [];
    this.colors.push({
        height: 0.99,
        color: VVGL.Color.blue
    });
    this.colors.push({
        height: 1.0,
        color: VVGL.Color.cyan
    });
    this.colors.push({
        height: 1.01,
        color: VVGL.Color.yellow
    });
    this.colors.push({
        height: 1.04,
        color: VVGL.Color.green
    });

    this.highestColor = new VVGL.Color(0.6, 0.4, 0.0);
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
