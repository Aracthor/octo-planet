function	main() {
	try {
		var app = new OctoPlanet("the-canvas");
		app.start();
	} catch (exception) {
		if (exception.toString) {
			alert(exception.toString());
		} else {
			throw exception;
		}
	}
}
