const Category = require('../models/category');
const generateSlug = require('../utils/generateSlug');
const categoryValidator = require('../validators/categoryValidator');


class CategoryController {

    async listCategories(req, res) {
        const categories = await Category.find({ isDeleted: false });
        res.render('admin/categories/index', { categories });
    };


    async showCreateForm(req, res) {
        res.render('admin/categories/create');
    };


    async createCategory(req, res) {
        const { error } = categoryValidator.validate(req.body);
        if (error) {
            req.flash('error', error.details[0].message);
            return res.redirect('/admin/categories');
        }
        const slug = generateSlug(req.body.name);
        await Category.create({ name: req.body.name, slug });
        req.flash('success', 'Category created successfully.');
        res.redirect('/admin/categories');
    };


    async showEditForm(req, res) {
        const category = await Category.findById(req.params.id);
        res.render('admin/categories/edit', { category });
    };


    async updateCategory(req, res) {
        const { error } = categoryValidator.validate(req.body);
        if (error) {
            req.flash('error', error.details[0].message);
            return res.redirect('/admin/categories');
        }
        const slug = generateSlug(req.body.name);
        await Category.findByIdAndUpdate(req.params.id, { name: req.body.name, slug });
        req.flash('success', 'Category updated successfully.');
        res.redirect('/admin/categories');
    };


    async deleteCategory(req, res) {
        await Category.findByIdAndUpdate(req.params.id, { isDeleted: true });
        req.flash('success', 'Category deleted successfully.');
        res.redirect('/admin/categories');
    };

};

module.exports = new CategoryController();
