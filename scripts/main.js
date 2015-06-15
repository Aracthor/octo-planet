function	main() {
	try {
		var app = new OctoPlanet("the-canvas");
		app.start();
	} catch (exception) {
		if (exception.type !== undefined) {
			alert(exception.what());
		} else {
			throw exception;
		}
	}
}
