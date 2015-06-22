Triangle = function (coords, tesselation) {
    this.subTriangles = [];
    this.coords = [];
    this.cutCoords(coords, tesselation);
};

Triangle.prototype.cutCoords = function (coords, tesselation) {
    if (tesselation > 1) {
        var coord01 = VVGL.Vec3.center(coords[0], coords[1]);
        var coord02 = VVGL.Vec3.center(coords[0], coords[2]);
        var coord12 = VVGL.Vec3.center(coords[1], coords[2]);

        this.subTriangles = [
            new Triangle([coords[0], coord01, coord02], tesselation - 1),
            new Triangle([coords[1], coord01, coord12], tesselation - 1),
            new Triangle([coords[2], coord02, coord12], tesselation - 1),
            new Triangle([coord01, coord02, coord12], tesselation - 1)
        ];
    } else {
        this.coords = coords;
    }
};
