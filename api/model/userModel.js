var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
		type: String,
		required: 'User name can\'t be empty'
	},
	password: {
		type: String,
		required: 'User password can\'t be empty'
	}
});

module.exports = mongoose.model('User', UserSchema);