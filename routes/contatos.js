var authenticate = require('../middleware/authenticate.js');
module.exports = function(app) {
	var contato = app.controllers.contatos;
	
	app.route('/contatos/:id').get(authenticate, contato.index);
	app.route('/contatos/create/:id').get(authenticate, contato.create).post(contato.post);
	
	app.route('/contatos/delete/:id/:amigo').post(contato.delete);
};
