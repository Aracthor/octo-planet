PlanetForm = function () {
    this.tessellationInput = document.getElementById("tessellation-level");
};


PlanetForm.prototype.getPlanetData = function () {
    var data = {};
    data.tessellationLevel = this.tessellationInput.value;

    return data;
};


PlanetForm.instance = null;

PlanetForm.submit = function () {
    if (PlanetForm.instance === null) {
        PlanetForm.instance = new PlanetForm();
    }
    var data = PlanetForm.instance.getPlanetData();
    VVGL.Application.access().createPlanet(data);

    return false;
};
