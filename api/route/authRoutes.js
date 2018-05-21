module.exports = function(app){
	var authController = require('../controller/authController');

	app.route('/api/register')
	   .post(authController.createUser);

	app.route('/api/login')
		.post(authController.loginUser);

	app.route('/me')
	   .get(authController.getUser);
}