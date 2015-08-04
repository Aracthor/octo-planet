VertexPainter = function () {
    this.colors = [];
    this.colors.push({
        height: -1,
        color: new VVGL.Color(0.0, 0.0, 0.5)
    });
    this.colors.push({
        height: 0,
        color: new VVGL.Color(0.0, 0.5, 0.5)
    });
    this.colors.push({
        height: 1,
        color: new VVGL.Color(0.5, 0.5, 0.0)
    });
    this.colors.push({
        height: 4,
        color: new VVGL.Color(0.0, 0.5, 0.0)
    });

    this.highestColor = new VVGL.Color(0.3, 0.2, 0.0);
};

VertexPainter.prototype.paint = function (height) {
    var color = this.highestColor;
    for (var i in this.colors) {
        var data = this.colors[i];
        if (height <= data.height) {
            color = data.color;
            break;
        }
    }

    return (color);
};
