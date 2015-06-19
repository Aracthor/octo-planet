PlanetForm = function () {
    this.seed = document.getElementById("seed");
    this.tessellationInput = document.getElementById("tessellation-level");
};


PlanetForm.prototype.getPlanetData = function () {
    var data = {};
    data.tessellationLevel = this.tessellationInput.value;

    return data;
};


PlanetForm.prototype.generateSeed = function () {
    this.seed.value = new Date().getTime();
};


PlanetForm.instance = null;

PlanetForm.getInstance = function () {
    if (PlanetForm.instance === null) {
        PlanetForm.instance = new PlanetForm();
    }
    return PlanetForm.instance;
};

PlanetForm.generateSeed = function () {
    var planetForm = PlanetForm.getInstance();
    planetForm.generateSeed();
    return false;
};

PlanetForm.submit = function () {
    var planetForm = PlanetForm.getInstance();
    var data = planetForm.getPlanetData();
    var seed = planetForm.seed.value;
    VVGL.Application.access().createPlanet(data, seed);

    return false;
};
