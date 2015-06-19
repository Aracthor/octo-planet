Triangle = function (coords, tesselation) {
    this.coords = this.cutCoords(coords, tesselation);
};

Triangle.prototype.cutCoords = function (coords, tesselation) {
    if (tesselation > 1) {
        var coord01 = VVGL.Vec3.center(coords[0], coords[1]);
        var coord02 = VVGL.Vec3.center(coords[0], coords[2]);
        var coord12 = VVGL.Vec3.center(coords[1], coords[2]);

        var coords = this.cutCoords([coords[0], coord01, coord02], tesselation - 1)
            .concat(this.cutCoords([coords[1], coord01, coord12], tesselation - 1))
            .concat(this.cutCoords([coords[2], coord02, coord12], tesselation - 1))
            .concat(this.cutCoords([coord01, coord02, coord12], tesselation - 1));
    }

    return (coords);
};

Triangle.prototype.extractVerticesCoords = function (radius) {
    this.verticesCoords = [];

    for (var i in this.coords) {
        var vector = this.coords[i];
        vector.normalize();
        vector.scale(radius);
        this.verticesCoords.push(vector.x);
        this.verticesCoords.push(vector.y);
        this.verticesCoords.push(vector.z);
    }

    return (this.verticesCoords);
};
