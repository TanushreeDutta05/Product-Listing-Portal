const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();


router.get('/', customerController.home);
router.get('/product/:slug', customerController.productDetails);
  

module.exports = router;