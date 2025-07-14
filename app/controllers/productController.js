const Product = require('../models/product');
const Category = require('../models/category');
const generateSlug = require('../utils/generateSlug');
const productValidator = require('../validators/productValidator');
const fs = require('fs');
const path = require('path');


class ProductController {

    async listProducts(req, res) {
        const products = await Product.find({ isDeleted: false }).populate('category');
        res.render('admin/products/index', { products });
    };


    async showCreateForm(req, res) {
        const categories = await Category.find({ isDeleted: false });
        res.render('admin/products/create', { categories });
    };


    async createProduct(req, res) {
        const { error } = productValidator.validate(req.body);
        if (error) {
            req.flash('error', error.details[0].message);
            return res.redirect('/admin/products');
        }
        const slug = generateSlug(req.body.name);
        const product = new Product({
            name: req.body.name,
            slug,
            category: req.body.category,
            description: req.body.description,
            image: req.file ? req.file.filename : null
        });
        await product.save();
        req.flash('success', 'Product created successfully.');
        res.redirect('/admin/products');
    };


    async showEditForm(req, res) {
        const product = await Product.findById(req.params.id);
        const categories = await Category.find({ isDeleted: false });
        res.render('admin/products/edit', { product, categories });
    };


    async updateProduct(req, res) {
        const { error } = productValidator.validate(req.body);
        if (error) {
            req.flash('error', error.details[0].message);
            return res.redirect('/admin/products');
        }
        const product = await Product.findById(req.params.id);
        const slug = generateSlug(req.body.name);
        if (req.file && product.image) {
            const oldPath = path.join(__dirname, '../../public/uploads/products', product.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        product.name = req.body.name;
        product.slug = slug;
        product.category = req.body.category;
        product.description = req.body.description;
        if (req.file) product.image = req.file.filename;
        await product.save();
        req.flash('success', 'Product updated successfully.');
        res.redirect('/admin/products');
    };


    async deleteProduct(req, res) {
        const product = await Product.findById(req.params.id);
        if (product.image) {
            const imgPath = path.join(__dirname, '../../public/uploads/products', product.image);
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }
        await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
        req.flash('success', 'Product deleted successfully.');
        res.redirect('/admin/products');
    };

};

module.exports = new ProductController();

