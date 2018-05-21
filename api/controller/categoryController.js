var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Transaction = mongoose.model('Transaction');

exports.getAllCategories = function(req, res){
	Category.find({}, function(err, categories){
		if(err) res.status(500).send(err);
		res.status(200).json(categories);
	});
}

exports.createCategory = function(req, res){
	var newCategory = new Category(req.body);
	newCategory.save(function(err, category){
		if(err) res.status(500).send(err);
		res.status(200).json(category);
	});
};

exports.getCategory = function(req, res){
	Category.findById(req.params.categoryId, function(err, category){
		if(err) res.status(500).send(err);
		res.status(200).json(category);
	});
};

exports.updateCategory = function(req, res){
	Category.findOneAndUpdate({_id: req.params.categoryId}, req.body, {new: true},
		function(err, category){
			if(err) res.status(500).send(err);
			res.status(200).json(category);
	});
};

exports.deleteCategory = function(req, res){
	Transaction.find({'category': req.params.categoryId}, function(err, transactions){
		if(err) res.status(500).send(err);
		transactions.forEach(function(transaction){
			transaction.remove();
		});
	});
	Category.remove({_id: req.params.categoryId}, function(err, category){
		if(err) res.status(500).send(err);
		res.status(200).json({'message': 'Category deleted'});
	});
};