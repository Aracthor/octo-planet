PlanetGenerator = function () {
    this.heightCalculator = new HeightCalculator();
    this.vertexPainter = new VertexPainter();
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
            var selectedIndices = [indices[i + 0], indices[i + 1], indices[i + 2]];
            var coordPositions = [
                selectedIndices[0] * 3, selectedIndices[0] * 3 + 1, selectedIndices[0] * 3 + 2,
                selectedIndices[1] * 3, selectedIndices[1] * 3 + 1, selectedIndices[1] * 3 + 2,
                selectedIndices[2] * 3, selectedIndices[2] * 3 + 1, selectedIndices[2] * 3 + 2
            ];
            var coords = [
                new VVGL.Vec3(isocaedreCoords[coordPositions[0]], isocaedreCoords[coordPositions[1]], isocaedreCoords[coordPositions[2]]),
                new VVGL.Vec3(isocaedreCoords[coordPositions[3]], isocaedreCoords[coordPositions[4]], isocaedreCoords[coordPositions[5]]),
                new VVGL.Vec3(isocaedreCoords[coordPositions[6]], isocaedreCoords[coordPositions[7]], isocaedreCoords[coordPositions[8]])
            ];
            triangles.push(new Triangle(coords, tessellation));
        }
    }

    return triangles;
};

PlanetGenerator.prototype.addPointToCoords = function (coords, point) {
    coords.push(point.x * this.radius),
    coords.push(point.y * this.radius),
    coords.push(point.z * this.radius);
};

PlanetGenerator.prototype.calculateColor = function (point) {
    var color = this.vertexPainter.paint(point);
    this.colors.push(color.r);
    this.colors.push(color.g);
    this.colors.push(color.b);
    this.colors.push(1.0);
};

PlanetGenerator.prototype.addTriangleToGrid = function (triangle) {
    this.addPointToCoords(this.gridCoords, triangle.coords[0]);
    this.addPointToCoords(this.gridCoords, triangle.coords[1]);
    this.addPointToCoords(this.gridCoords, triangle.coords[1]);
    this.addPointToCoords(this.gridCoords, triangle.coords[2]);
    this.addPointToCoords(this.gridCoords, triangle.coords[2]);
    this.addPointToCoords(this.gridCoords, triangle.coords[0]);
};

PlanetGenerator.prototype.calculateVerticesForTriangle = function (triangle) {
    if (triangle.subTriangles.length > 0) {
        for (var i in triangle.subTriangles) {
            this.calculateVerticesForTriangle(triangle.subTriangles[i]);
        }
    } else {
        for (var j in triangle.coords) {
            var point = triangle.coords[j];
            this.heightCalculator.calculate(point);
            this.addPointToCoords(this.coords, point);
            this.calculateColor(point);
        }
        this.addTriangleToGrid(triangle);
    }

};

PlanetGenerator.prototype.calculateVertices = function () {
    for (var i in this.triangles) {
        this.calculateVerticesForTriangle(this.triangles[i]);
    }
};

PlanetGenerator.prototype.generate = function (data) {
    var random = new VVGL.Random(parseInt(data.seed));
    var planet = new VVGL.Mesh(VVGL.RenderMode.TRIANGLES);
    var grid = new VVGL.Mesh(VVGL.RenderMode.LINES);

    this.triangles = this.getTrianglesList(data.tessellationLevel);

    this.heightCalculator.init(random);
    this.coords = new Array(this.triangles.length * 3 * 3);
    this.colors = new Array(this.triangles.length * 3 * 4);
    this.gridCoords = new Array(this.triangles.length * 3 * 6);
    this.calculateVertices();

    planet.addPositions(this.coords);
    planet.addColors(this.colors);
    grid.addPositions(this.gridCoords);

    return {planet: planet, grid: grid};
};
