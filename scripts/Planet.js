Planet = function (radius) {
    VVGL.Mesh.call(this, VVGL.RenderMode.TRIANGLES);

    this.radius = radius;
    this.triangles = [];
};

Planet.prototype = Object.create(VVGL.Mesh.prototype)

Planet.prototype.getVerticesCoords = function () {
    var coords = [];

    for (var i in this.triangles) {
        var triangle = this.triangles[i];
        triangle.extractVerticesCoords(this.radius);
        coords = coords.concat(triangle.verticesCoords);
    }

    return coords;
};
