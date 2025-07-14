const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();


router.get('/', categoryController.listCategories);
router.get('/new', categoryController.showCreateForm);
router.post('/new', categoryController.createCategory);
router.get('/edit/:id', categoryController.showEditForm);
router.post('/edit/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);


module.exports = router;