const dotenv = require('dotenv').config()
const dbConnection = require('./app/config/db')
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const flash = require("connect-flash")
const methodOverride = require('method-override');


const app = express()

dbConnection()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

app.use(methodOverride('_method'));

app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true
}));

app.use(flash());


app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success')  || '';
  res.locals.error_msg = req.flash('error')  || '';
  next();
});

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const adminRoutes = require('./app/routes/adminRoutes');
const categoryRoutes = require('./app/routes/categoryRoutes');
const productRoutes = require('./app/routes/productRoutes');
const customerRoutes = require('./app/routes/customerRoutes')
app.use('/admin', adminRoutes);
app.use('/admin/categories', categoryRoutes);
app.use('/admin/products', productRoutes);
app.use('/', customerRoutes);


const port = 3002

app.listen(port, () => {
    console.log(`server running port http://localhost:${port}`)
})