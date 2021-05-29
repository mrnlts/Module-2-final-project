const express = require('express');

const router = express.Router();
const User = require('../models/User.model');
const Business = require('../models/Business.model');
const Product = require('../models/Product.model');
const Order = require('../models/Order.model');
const isBusiness = require('../middleware/business.js');
const isCustomer = require('../middleware/customer');
const fileUploader = require('../configs/cloudinary.config');

// RENDER ADD BUSINESS FORM
router.get('/add', isCustomer, (req, res) => res.render('business/add-business', {addBusiness:true, errorMessage: req.flash('blank')}));

// POST NEW BUSINESS TO DATABASE
router.post('/add', fileUploader.single('image'), async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { businessName, businessType, city } = req.body;
  if (businessName === '' || businessType === '' || city === '' || req.file === '') {
    req.flash('blank', 'Please fill all fields');
    res.redirect('/business/add');
  }
  try {
    const dbBusiness = await Business.create({
      businessName,
      businessType,
      city,
      owner: userId,
      imageUrlBusiness: req.file.path,
    });
    if (dbBusiness) {
      await User.findByIdAndUpdate(userId, { role: 'business' });
      res.redirect('/business/profile');
    } else {
      res.render('error500');
    }
  } catch (e) {
    res.render('error500');
    next(e);
  }
});

// RENDER BUSINESS HOME PAGE //
router.get('/profile', isBusiness, async (req, res, next) => {
  try {
    const dbUser = await User.findById(req.session.currentUser._id);
    const dbBusiness = await Business.findOne({ owner: dbUser.id });
    const dbOrders = await Order.find({ businessName: dbBusiness.id });
    res.render('business/mainPage', { dbBusiness, dbOrders, businessMainPage: true });
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

// RENDER BUSINESS PRODUCTS PAGE //
router.get('/products', isBusiness, async (req, res, next) => {
  try {
    const dbBusiness = await Business.findOne({ owner: req.session.currentUser._id });
    const dbProducts = await Product.find({ businessName: dbBusiness });
    res.render('business/products', { dbProducts, successMessage: req.flash('productRemoved'), products: true });
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

// RENDER ADD PRODUCT FORM //
router.get('/add-product', isBusiness, (req, res) => res.render('business/add-product', {errorMessage: req.flash('blank'), addProduct:true}));

// ADD PRODUCT TO DB //
router.post('/add-product', fileUploader.single('image'), async (req, res, next) => {
  const { price, description } = req.body;
  if (price === '' || description === '' || req.file === '') {
    req.flash('blank', 'Please fill all fields');
    res.redirect('/business/add-product');
  }
  try {
    const dbBusiness = await Business.findOne({ owner: req.session.currentUser._id });
    await Product.create({ businessName: dbBusiness.id, price, description, imageUrlProduct: req.file.path });
    res.redirect('/business/products');
  } catch (e) {
    res.render('error500');
    next(e);
  }
});

// EDIT PRODUCT //
router.get('/products/:id/edit', isBusiness, async (req, res, next) => {
  const {id} = req.params;
  try {
    const dbProduct = await Product.findById(id);
    res.render('business/edit-product-form', {dbProduct, editProduct: true, errorMessage: req.flash('blank')})
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

router.post('/products/:id/edit', isBusiness, fileUploader.single('image'), async (req, res, next) => {
  const {id} = req.params;
  const { price, description } = req.body;
  if (price === '' || description === '' || req.file === '') {
    req.flash('blank', 'Please fill all fields');
    res.redirect(`/business/products/${id}/edit`);
  }
  try {
    if (!req.file) {
      await Product.findByIdAndUpdate(id, {price, description});
      res.redirect('/business/products');
    } else {
      await Product.findByIdAndUpdate(id, {price, description, imageUrlProduct: req.file.path });
      res.redirect('/business/products');
    }
  } catch (e) {
    res.render('error500');
    next(e);
  }
});


// DELETE PRODUCT //
router.post('/products/:id/delete', async(req, res, next) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndRemove(id);
    req.flash('productRemoved', 'The selected product was removed successfully!');
    res.redirect('/business/products');
  } catch(e) {
    res.render('error500');
    next(e);
  }
})

// RENDER BUSINESS ORDERS PAGE //
router.get('/orders', isBusiness, async (req, res, next) => {
  try {
    const dbBusiness = await Business.findOne({ owner: req.session.currentUser._id });
    const dbOrders = await Order.find({ business: dbBusiness.id, status: 'pending' }).populate('user').populate({ path: 'products', populate: [{ path: 'product' }]});
    res.render('business/orders', { dbOrders, deliverMessage: req.flash('deliver'), orders: true });
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

// RENDER BUSINESS EDIT PAGE //
router.get('/profile/edit', isBusiness, async (req, res, next) => {
  try {
    const dbBusiness = await Business.findOne({ owner: req.session.currentUser._id });
    res.render('business/edit-form', { dbBusiness, editBusiness: true, errorMessage: req.flash('blank') });
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

// UPDATE DB BUSINESS DATA //
router.post('/profile/edit', fileUploader.single('image'), async (req, res, next) => {
  const { businessName, businessType, city } = req.body;
  try {
    if (businessName && businessType && city && req.file) {
      await Business.findOneAndUpdate(
        { owner: req.session.currentUser._id },
        { businessName, businessType, city, imageUrlBusiness: req.file.path },
        { new: true },
      );
      res.redirect('/business/profile');
    } else {
      req.flash('blank', 'Please fill all fields');
      res.redirect('/business/edit-form');
    }
  } catch (e) {
    res.render('error500');
    next(e);
  }
});

// RENDER BUSINESS DETAILS //
router.get('/:id/detail', async (req, res, next) => {
  const { id } = req.params;
  try {
    const dbBusiness = await Business.findById(id);
    if (dbBusiness) {
      const dbProducts = await Product.find({ businessName: dbBusiness.id });
      res.render('business/detail', { dbBusiness, dbProducts, businessDetail: true });
    } else {
      res.render('error404');
    }
  } catch (e) {
    res.render('error404');
    next(e);
  }
});

// DELETE BUSINESS //
router.post('/delete', async (req, res, next) => {
  try {
    const dbUser = await User.findByIdAndUpdate(req.session.currentUser._id, { role: 'customer' });
    const dbBusiness = await Business.findOne({ owner: dbUser.id });
    await Product.deleteMany({ businessName: dbBusiness.id });
    await Order.deleteMany({ business: dbBusiness.id });
    await Business.findOneAndRemove({ owner: dbUser.id });
    res.redirect('/user/profile');
  } catch (e) {
    res.render('error500');
    next(e);
  }
});

module.exports = router;
