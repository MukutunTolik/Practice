module.exports = function(app){
	var categoryController = require('../controller/categoryController');

	app.route('/api/categories')
	   .get(categoryController.getAllCategories)
	   .post(categoryController.createCategory);

	app.route('/api/categories/:categoryId')
	   .get(categoryController.getCategory)
	   .put(categoryController.updateCategory)
	   .delete(categoryController.deleteCategory);
}