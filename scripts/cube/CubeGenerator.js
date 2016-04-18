CubeGenerator = function () {

};

CubeGenerator.prototype = Object.create(IPlanetGenerator.prototype);

CubeGenerator.prototype.generate = function (data) {
    var random = new VVGL.Random(parseInt(data.seed));

    return {planet: null, cube: null};
};
