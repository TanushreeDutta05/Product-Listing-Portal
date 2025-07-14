const Category = require('../models/category');
const Product = require('../models/product');


class AdminController {

    async getDashboard(req, res) {
        try {
            const totalProducts = await Product.countDocuments({ isDeleted: false });
            const totalCategories = await Category.countDocuments({ isDeleted: false });

            res.render('admin/dashboard', {
                totalProducts,
                totalCategories
            });
        } catch (error) {
            res.status(500).send("Server Error");
        }
    };

};


module.exports = new AdminController();