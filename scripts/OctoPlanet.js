OctoPlanet = function (canvasId) {
	VVGL.Application3D.call(this, canvasId);

    var scene = new VVGL.Scene();
    this.scene = scene;
	this.getSceneManager().addScene("mainScene", scene, true);

	var shader = VVGL.ShaderProgram.createFromFiles("vertex-shader", "fragment-shader");
    this.shader = shader;
	
	var camera = new VVGL.TrackballCamera();
    this.cameraNode = new VVGL.SceneNode(camera);
    scene.getRoot().addChild(this.cameraNode);
    scene.setActiveCamera(camera);

	var alight = new VVGL.AmbianceLight("aLight");
	alight.color.r = 0.1;
	alight.color.g = 0.1;
	alight.color.b = 0.1;
    scene.getRoot().addChild(new VVGL.SceneNode(alight));

    this.skybox = new VVGL.Skybox(new VVGL.GLTexture("textures/stars.png"));
    scene.setSkybox(this.skybox);

    this.planetGenerator = new PlanetGenerator();
    this.planet = null;
    this.grid = null;
};

OctoPlanet.prototype = Object.create(VVGL.Application3D.prototype);

OctoPlanet.prototype.manageData = function () {
	VVGL.Application.prototype.manageData.call(this);
};

OctoPlanet.prototype.setGridVisibility = function (visibility) {
    this.gridVisiblity = visibility;
    if (this.grid !== null) {
        this.grid.visible = visibility;
    }
};

OctoPlanet.prototype.setSkyboxVisibility = function (visibility) {
    if (visibility) {
        this.scene.setSkybox(this.skybox);
    } else {
        this.scene.setSkybox(null);
    }
};

OctoPlanet.prototype.changeCamera = function (type) {
    var oldCamera = this.cameraNode.data;
    var newCamera;

    if (type == "trackball") {
        newCamera = VVGL.TrackballCamera.copy(oldCamera);
        newCamera.target.set(0, 0, 0);
        newCamera.fixDistanceToCurrent();
    } else if (type == "freefly") {
        newCamera = VVGL.FreeFlyCamera.copy(oldCamera);
    }

    this.scene.setActiveCamera(newCamera);
    this.cameraNode.data = newCamera;
};

OctoPlanet.prototype.createPlanet = function (data) {
    if (this.planet !== null) {
        this.scene.getRoot().removeChild(this.planet);
        this.scene.getRoot().removeChild(this.grid);
    }

    this.getRenderer().disableBackfaceCulling();

    var data = this.planetGenerator.generate(data);
    data.planet.setShader(this.shader);
    data.grid.setShader(this.shader);
    this.planet = new VVGL.SceneNode(data.planet);
    this.grid = new VVGL.SceneNode(data.grid);
    this.grid.scale(1.001);
    this.grid.visible = this.gridVisiblity;

    this.scene.getRoot().addChild(this.planet);
    this.scene.getRoot().addChild(this.grid);
};
