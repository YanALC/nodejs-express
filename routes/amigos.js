module.exports = function(app) {
	var amigo = app.controllers.amigos;
	var authenticate = require('../middleware/authenticate');
	app.route('/amigos').get(authenticate, amigo.index);
	app.route('/amigos/create').get(authenticate, amigo.create).post(amigo.salvar);
	app.route('/amigos/show/:id').get(authenticate, amigo.show);
	app.route('/amigos/delete/:id').post(amigo.delete);
	app.route('/amigos/edit/:id').get(authenticate, amigo.editar).post(amigo.update);
};
