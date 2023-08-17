const db = require('../Model');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const fs = require('fs')
const multer = require('multer');
const sharp = require('sharp');
const { Sequelize } = require('sequelize');

const Product = db.product;

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    return callback(null, true);
  }
  return callback(new appError('File is not image!please upload image only', 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadPhoto = upload.single('image');

const resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    req.body.image = '';
    return next();
  }
  req.file.filename = `tour-${Date.now()}.jpeg`;
  await sharp(req.file.buffer).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`Images/${req.file.filename}`);
  req.body.image = req.file.filename
  next();
});

const createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    status: req.body.status
  });
  res.status(201).json({
    status: 'success',
    data: {
      product
    }
  });
});

const getProducts = catchAsync(async (req, res, next) => {

  const limit = req.query.limit || 10;
  const offset = req.query.page - 1 || 0;
  const like = req.query.name || '';
  const price = req.query.price || 10000000;
  const {count, rows} = await Product.findAndCountAll({
    where: { status: 'active',
            name: {
                    [Sequelize.Op.like]: `%${like}%`
                  },
                  price: {
                    [Sequelize.Op.lte]: price
                  }
          },
    offset: `${offset}`,
    limit: `${limit}`
  });
  const pages = Math.ceil(count / limit);
  res.status(200).json({
    status: 'success',
    results: count,
    data: {
      rows
    },
    totalPages: pages
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const oldProduct = await Product.findOne({
    where: { productId: id }
  });
  if (req.file) {
    if (oldProduct.image !== '') {
      fs.unlink(`images/${oldProduct.image}`)
    };
  }
  const productUpdate = await Product.update(req.body, {
    where: { productId: id }
  });
  const product = await Product.findOne({
    where: { productId: id }
  });
  if (!productUpdate) {
    return next(new appError("Not found product with this id", 404));
  };
  res.status(200).json({
    status: "success",
    data: {
      product
    }
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const product = await Product.findOne({
    where: { productId: id }
  });

  if (!product) {
    return next(new appError("Not found product with this id", 404));
  }
  const productDelete = await Product.destroy({
    where: { productId: id }
  });
  // if (product.image) {
  //   fs.unlink(`images/${product.image}`)
  // };
  return res.status(200).json({
    status: 'success',
    message: 'Product is deleted'
  });
});

module.exports = {
  uploadPhoto, resizePhoto, getProducts, createProduct, updateProduct, deleteProduct
};