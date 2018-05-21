module.exports = function(app){
	var transactionController = require('../controller/transactionController');

	app.route('/api/transactions')
	   .get(transactionController.getAllTransactions)
	   .post(transactionController.createTransaction);

	app.route('/api/transactions/:transactionId')
	   .get(transactionController.getTransaction)
	   .put(transactionController.updateTransaction)
	   .delete(transactionController.deleteTransaction);
}