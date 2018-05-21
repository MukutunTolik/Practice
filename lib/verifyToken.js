var jwt = require('jsonwebtoken');
var config = require('./config');

function verifyToken(req, res, next){
	var token = req.headers['x-access-token'];
	if(!token)
		return res.send({auth: false, message: 'No token provided'});

	jwt.verify(token, config.get('secret'), function(err, decoded){
		if(err)
			return res.send({auth: false, message: 'Failed to authenticate token'});

		req.userId = decoded.id;
		next();
	});
};

module.exports = verifyToken;