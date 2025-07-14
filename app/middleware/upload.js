const multer = require('multer');
const path = require('path');

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/products');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueName = `product-${Date.now()}${ext}`;
        cb(null, uniqueName);
    }
});

const uploadProductImage = multer({
    storage: productStorage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG and PNG images are allowed'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


module.exports = { uploadProductImage };
