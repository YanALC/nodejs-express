module.exports = function(app) {
	var home = app.controllers.home;
	var authenticate = require('../middleware/authenticate');
	app.route('/').get(home.login).post(home.authetication);
	app.route('/home').get(authenticate, home.index);
	app.route('/logout').get(home.logout);
	app.route('/email').get(authenticate, home.email).post(home.enviar);
};
