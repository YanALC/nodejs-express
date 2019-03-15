module.exports = function(app) {
	var usuario = app.controllers.usuarios;
	var authenticate = require('../middleware/authenticate');
	app.route('/usuarios').get(authenticate, usuario.index);
	app.route('/usuarios/create').get(authenticate, usuario.create).post(usuario.post);
	app.route('/usuarios/show/:id').get(authenticate, usuario.show);
	app.route('/usuarios/delete/:id').post(usuario.delete);
	app.route('/usuarios/edit/:id').get(authenticate, usuario.edit).post(usuario.update);
};
