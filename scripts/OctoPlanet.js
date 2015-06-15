OctoPlanet = function (canvasId) {
	VVGL.Application.call(this, canvasId);
	
	var scene = new VVGL.Scene();
	this.getSceneManager().addScene("mainScene", scene, true);
	
	var shader = VVGL.ShaderProgram.createFromFiles("vertex-shader", "fragment-shader");
	
	var camera = new VVGL.TrackballCamera();
	scene.getRoot().addChild(new VVGL.SceneNode(camera));
	scene.setActiveCamera(camera);
	
	var alight = new VVGL.AmbianceLight("aLight");
	alight.color.r = 0.1;
	alight.color.g = 0.1;
	alight.color.b = 0.1;
	scene.getRoot().addChild(new VVGL.SceneNode(alight));

	var axis = new VVGL.Axis(10.0);
	axis.setShader(shader);
	scene.getRoot().addChild(new VVGL.SceneNode(axis));


	this.acceptReload();
};

OctoPlanet.prototype = Object.create(VVGL.Application.prototype);

OctoPlanet.prototype.manageData = function () {
	VVGL.Application.prototype.manageData.call(this);
};
