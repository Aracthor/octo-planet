PlanetForm = function () {
    this.seed = document.getElementById("seed");
    this.tessellationInput = document.getElementById("tessellation-level");
};


PlanetForm.prototype.getPlanetData = function () {
    var data = {};
    data.seed = parseInt(this.seed.value);
    data.tessellationLevel = parseInt(this.tessellationInput.value);
    if (isNaN(data.seed)) {
        throw new VVGL.Exception("Invalid seed. I want a number !");
    } else if (isNaN(data.tessellationLevel) || data.tessellationLevel < 1 || data.tessellationLevel > 8) {
        throw new VVGL.Exception("Invalid tessellation level. I want a number between 1 and 8 !");
    }

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
    try {
        var planetForm = PlanetForm.getInstance();
        var data = planetForm.getPlanetData();
        VVGL.Application.access().createPlanet(data);
    } catch (exception) {
        if (exception.what) {
            alert(exception.what());
        } else {
            alert(exception);
        }
        console.log(exception);
    };
    return false;
};
