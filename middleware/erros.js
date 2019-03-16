exports.notfound = function(req, res) {
	res.status(404);
	res.render('not-found');
};

exports.serverError = function(err, req, res) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error  : {}
	});
};
