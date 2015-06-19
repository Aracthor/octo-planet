PlanetGenerator = function () {
    this.radius = 5.0;
};

PlanetGenerator.prototype.getTrianglesList = function (tessellation) {
    var X = 1.0;
    var Z = (X + Math.sqrt(5.0) * X) / 2.0;

    var isocaedreCoords = [
        -X, 0.0, Z, X, 0.0, Z, -X, 0.0, -Z, X, 0.0, -Z,
        0.0, Z, X, 0.0, Z, -X, 0.0, -Z, X, 0.0, -Z, -X,
        Z, X, 0.0, -Z, X, 0.0, Z, -X, 0.0, -Z, -X, 0.0
    ];

    var indices = [
        0,4,1, 0,9,4, 9,5,4, 4,5,8, 4,8,1,
        8,10,1, 8,3,10, 5,3,8, 5,2,3, 2,7,3,
        7,10,3, 7,6,10, 7,11,6, 11,0,6, 0,1,6,
        6,1,10, 9,0,11, 9,11,2, 9,2,5, 7,2,11
    ];

    var triangles = [];

    for (var i in indices) {
        if (i % 3 === 0) {
            i = parseInt(i);
            // TODO clear this dirty code
            var coords = [
                new VVGL.Vec3(isocaedreCoords[indices[i + 0] * 3], isocaedreCoords[indices[i + 0] * 3 + 1], isocaedreCoords[indices[i + 0] * 3 + 2]),
                new VVGL.Vec3(isocaedreCoords[indices[i + 1] * 3], isocaedreCoords[indices[i + 1] * 3 + 1], isocaedreCoords[indices[i + 1] * 3 + 2]),
                new VVGL.Vec3(isocaedreCoords[indices[i + 2] * 3], isocaedreCoords[indices[i + 2] * 3 + 1], isocaedreCoords[indices[i + 2] * 3 + 2])
            ]
            triangles.push(new Triangle(coords, tessellation));
        }
    }

    return triangles;
};

PlanetGenerator.prototype.generate = function (data, seed) {
    var planet = new Planet(this.radius);

    planet.triangles = this.getTrianglesList(data.tessellationLevel);

    var coords = planet.getVerticesCoords();

    var colors = [];
    for (var i = 0; i < coords.length / 3; ++i) {
        colors.push(Math.random());
        colors.push(Math.random());
        colors.push(Math.random());
        colors.push(1.0);
    }

    planet.addPositions(coords);
    planet.addColors(colors);

    return planet;
};
