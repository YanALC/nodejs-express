var nodemailer = require('nodemailer');
module.exports = function(app) {
	var Usuario = app.models.usuarios;
	var validacao = require('../validations/authentication');
	
	return {
		index        : function(req, res) {
			res.render('home/index');
		},
		login        : function(req, res) {
			res.render('home/login');
		},
		authetication: function(req, res) {
			var usuario = new Usuario();
			var email = req.body.email;
			var password = req.body.password;
			if (validacao(req, res)) {
				Usuario.findOne({'email': email}, function(err, data) {
					if (err) {
						req.flash('erro', 'Erro ao entrar no sistema: ' + err);
						res.redirect('/');
					} else if (!data) {
						req.flash('erro', 'E-mail não encontrado!');
						res.redirect('/');
					} else if (!usuario.validPassword(password, data.password)) {
						req.flash('erro', 'Senha não confere!');
						res.redirect('/');
					} else {
						req.session.usuario = data;
						res.redirect('/home');
					}
				});
			} else {
				res.redirect('/');
			}
		},
		logout       : function(req, res) {
			req.session.destroy();
			res.redirect('/');
		},
		email        : function(req, res) {
			res.render('home/email');
		},
		enviar       : function(req, res) {
			var transport = nodemailer.createTransport("SMTP", {
				host: "smtp.mandrillapp.com",
				port: 587,
				auth: {
					user: 'yanalc2016@outlook.com',
					pass: 'rzAO2gyudLbJs_n0U5ZrqQ'
				}
			});
			var mailOptions = {
				from   : req.body.nome + " <" + req.body.email + ">",
				to     : "yanalc2016@outlook.com",
				subject: req.body.assunto,
				text   : req.body.mensagem
			};
			transport.sendMail(mailOptions, function(err) {
				if (err) {
					req.flash('erro', 'Erro ao enviar e-mail: ' + err);
					res.redirect('/email');
				} else {
					req.flash('into', 'E-mail enviado com sucesso!');
					res.redirect('/email');
				}
			});
		}
	};
};
