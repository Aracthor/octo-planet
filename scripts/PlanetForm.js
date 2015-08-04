PlanetForm = function () {
    this.seed = document.getElementById("seed");
    this.tessellationInput = document.getElementById("tessellation-level");
    this.gridDisplay = document.getElementById("display-grid");
    this.skyboxDisplay = document.getElementById("display-skybox");
    this.cameraType = document.getElementById("camera-type");
    this.configureTrackballCameraOptions();

    this.changeGridDisplay();
};


PlanetForm.prototype.createChangeFunction = function (id, field, camera) {
    var input = document.getElementById(id);

    return (function () {
        camera[field] = input.value;
    });
};

PlanetForm.prototype.configureTrackballCameraOptions = function () {
    var camera = VVGL.Application.access().getSceneManager().getCurrentScene().getActiveCamera();
    this.cameraOptions = document.getElementById("trackball-options");

    document.getElementById("trackball-rotation-speed").onchange = this.createChangeFunction("trackball-rotation-speed", "rotationSpeed", camera);
    document.getElementById("trackball-zoom-speed").onchange = this.createChangeFunction("trackball-zoom-speed", "zoomSpeed", camera);
    document.getElementById("trackball-inertia-coef").onchange = this.createChangeFunction("trackball-inertia-coef", "inertiaCoef", camera);
};

PlanetForm.prototype.configureFreeflyCameraOptions = function () {
    var camera = VVGL.Application.access().getSceneManager().getCurrentScene().getActiveCamera();
    this.cameraOptions = document.getElementById("freefly-options");

    document.getElementById("freefly-speed").onchange = this.createChangeFunction("freefly-speed", "speed", camera);
    document.getElementById("freefly-sensitivity").onchange = this.createChangeFunction("freefly-sensitivity", "sensitivity", camera);
    document.getElementById("freefly-inertia-coef").onchange = this.createChangeFunction("freefly-inertia-coef", "inertiaCoef", camera);
};

PlanetForm.prototype.getPlanetData = function () {
    var data = {};
    data.seed = parseInt(this.seed.value);
    data.tessellationLevel = parseInt(this.tessellationInput.value);
    if (isNaN(data.seed)) {
        throw new VVGL.Exception("Invalid seed. I want a number !");
    } else if (isNaN(data.tessellationLevel) || data.tessellationLevel < 1 || data.tessellationLevel > 7) {
        throw new VVGL.Exception("Invalid tessellation level. I want a number between 1 and 7 !");
    }

    return data;
};


PlanetForm.prototype.generateSeed = function () {
    this.seed.value = new Date().getTime();
};

PlanetForm.prototype.changeGridDisplay = function () {
    var app = VVGL.Application.access();
    app.setGridVisibility(this.gridDisplay.checked);
};

PlanetForm.prototype.changeSkyboxDisplay = function () {
    var app = VVGL.Application.access();
    app.setSkyboxVisibility(this.skyboxDisplay.checked);
};

PlanetForm.prototype.changeCamera = function () {
    var type = this.cameraType.options[this.cameraType.selectedIndex].value;

    VVGL.Application.access().changeCamera(type);

    this.cameraOptions.hidden = true;
    type == "trackball" ? this.configureTrackballCameraOptions() : this.configureFreeflyCameraOptions();
    this.cameraOptions.hidden = false;
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

PlanetForm.changeGridDisplay = function () {
    var planetForm = PlanetForm.getInstance();
    planetForm.changeGridDisplay();
};

PlanetForm.changeSkyboxDisplay = function () {
    var planetForm = PlanetForm.getInstance();
    planetForm.changeSkyboxDisplay();
};

PlanetForm.changeCamera = function () {
    var planetForm = PlanetForm.getInstance();
    planetForm.changeCamera();
};

PlanetForm.submit = function () {
    try {
        var planetForm = PlanetForm.getInstance();
        var data = planetForm.getPlanetData();
        VVGL.Application.access().createPlanet(data);
    } catch (exception) {
        if (exception.toString) {
            alert(exception.toString());
        } else {
            alert(exception);
        }
        console.log(exception);
    };
    return false;
};
