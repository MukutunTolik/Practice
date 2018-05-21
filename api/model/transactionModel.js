var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: 'Category can\'t be empty'
	},
	type: {
		type: String,
		enum: ['expense', 'revenue'],
		default: 'expense'
	},
	total: {
		type: Number,
		required: 'Total can\'t be empty'
	},
	description: {
		type: String,
		default: null
	},
	date_created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Transaction', TransactionSchema);