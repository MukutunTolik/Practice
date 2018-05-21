var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../lib/config');
var User = mongoose.model('User');

exports.createUser = function(req, res){
	var hashedPassword = bcrypt.hashSync(req.body.password, 8);

	User.create({
		name: req.body.name,
		password: hashedPassword
	}, function(err, user){
		if(err) return res.send(err);

		var token = jwt.sign({id: user._id}, config.get('secret'), {
			expiresIn: 86400 //expires in 24 hours
		});

		res.status(200).send({auth: true, token: token});
	});
};

exports.loginUser = function(req, res){
	User.findOne({name: req.body.name}, function(err, user){
		if(err) return res.status(500).send({error: 'Error on the server'});
		if(user == null) return res.status(200).send({error: 'No user found'});

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if(!passwordIsValid) return res.send({auth: false, token: null});

		var token = jwt.sign({id: user._id}, config.get('secret'), {
			expiresIn: 86400 //expires in 24hours
		});

		res.status(200).send({auth: true, token: token});
	});
};
exports.getUser = function(req, res){
	var token = req.headers['x-access-token'];

	if(!token) return res.status(401).send({auth: false, message: 'No token provided.'});

	jwt.verify(token, config.get('secret'), function(err, decoded){
		if(err) return res.send({auth: false, message: 'Failed to authenticate token.'});

		User.findById(decoded.id, {password: 0}, function(err, user){
			if(err) return res.status(500).send({error: 'There was a problem finding the user.'});
			if(user == null) return res.status(200).send({error: 'No user found.'});

			res.status(200).send(user); 
		});
	});
}