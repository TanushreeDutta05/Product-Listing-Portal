const Product = require('../models/product');
const Category = require('../models/category');


class CustomerController {

    async home(req, res) {
        try {
            const { category, search } = req.query;
            const filter = { isDeleted: false };

            if (category) {
                filter.category = category;
            }

            if (search) {
                filter.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }

            const categories = await Category.find({ isDeleted: false });
            const products = await Product.find(filter).populate('category');

            res.render('customer/index', { categories, products, selectedCategory: category, search });
        } catch (err) {
            res.status(500).send('Server Error');
        }
    };


    async productDetails(req, res) {
        try {
            const product = await Product.findOne({ slug: req.params.slug, isDeleted: false }).populate('category');
            if (!product) return res.status(404).send('Product not found');
            res.render('customer/detail', { product });
        } catch (err) {
            res.status(500).send('Server Error');
        }
    };

};


module.exports = new CustomerController();
