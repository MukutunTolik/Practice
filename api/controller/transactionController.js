var mongoose = require('mongoose');
var Transaction = mongoose.model('Transaction');
var Category = mongoose.model('Category');

function isCategoryExists(categoryId, onErrorHandler, onSuccessHandler)
{
	Category.findById(categoryId, function(err, category){
		if(err || category == null) onErrorHandler(err, category);
		else onSuccessHandler();
	});
}

parseGetQuery = function(queries)
{
	if(queries.date_created_from!= undefined && queries.date_created_till != undefined)
	{
		queries.date_created = {$gte: queries.date_created_from, $lt: queries.date_created_till};
		delete queries.date_created_till;
		delete queries.date_created_from;
	}
	else if(queries.date_created_from != undefined)
	{
		queries.date_created = {$gte: queries.date_created_from};
		delete queries.date_created_from;
	}
	else if(queries.date_created_till!= undefined)
	{
		queries.date_created = {$lt: queries.date_created_till};
		delete queries.date_created_till;
	}
	return queries;
}

exports.getAllTransactions = function(req, res){
	Transaction.find(parseGetQuery(req.query), function(err, transactions){
		if(err) res.status(500).send(err);
		res.status(200).json(transactions);
	});
}

exports.createTransaction = function(req, res){
	isCategoryExists(req.body.category, function(err, category){
		if(err)res.status(500).send(err);
		if(category == null)res.status(200).json({'error': 'Such category was not found'});
	}, function(){
		var newTransaction = new Transaction(req.body);
		newTransaction.save(function(err, transaction){
			if(err) res.status(500).send(err);
			res.status(200).json(transaction);
		});
	});
};



exports.getTransaction = function(req, res){
	Transaction.findById(req.params.transactionId, function(err, transaction){
		if(err) res.status(500).send(err);
		res.status(200).json(transaction);
	});
};

exports.updateTransaction = function(req, res){
	isCategoryExists(req.body.category, function(err, category){
		if(err)res.status(500).send(err);
		if(category == null)res.status(200).json({'error': 'Such category was not found'});
	}, function(){
		Transaction.findOneAndUpdate({_id: req.params.transactionId}, req.body, {new: true},
			function(err, transaction){
				if(err) res.status(500).send(err);
				res.status(200).json(transaction);
		});
	});
};

exports.deleteTransaction = function(req, res){
	Transaction.remove({_id: req.params.transactionId}, function(err, transaction){
		if(err) res.status(500).send(err);
		res.status(200).json({'message': 'Transaction deleted'});
	});
};