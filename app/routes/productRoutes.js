const express = require('express');
const productController = require('../controllers/productController');
const { uploadProductImage } = require('../middleware/upload');
const router = express.Router();


router.get('/', productController.listProducts);
router.get('/new', productController.showCreateForm);
router.post('/new', uploadProductImage.single('image'), productController.createProduct);
router.get('/edit/:id', productController.showEditForm);
router.post('/edit/:id', uploadProductImage.single('image'), productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);


module.exports = router;