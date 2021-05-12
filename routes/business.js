const express = require('express');

const router = express.Router();
const Business = require('../models/Business.model');
const Product = require('../models/Product.model');
const Order = require('../models/Order.model');

// RENDER BUSINESS HOME PAGE //
router.get('/:id', (req, res, next) => {
  const {id} = req.params;
  Business.findById({"_id": id})
    .then(dbBusiness => {
      Product.find({businessName: id})
        .then((selected) => {
          let currentOrders = [];
          selected.forEach(prod => {
            console.log("PROD id: ", prod.id);
            Order.find({"product": prod.id})
            .populate('user product')
            .then((dbOrders) => {
              dbOrders.forEach((order)=> {
                currentOrders.push(order)
              });
            })
          })
          res.render('business/mainPage', {dbBusiness, currentOrders});
        })    
    })
    .catch(err => next(err));
});


// RENDER BUSINESS EDIT PAGE // 

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params;
    Business.findById(id)
      .then(dbBusiness => res.render('business/edit-form', { dbBusiness }))
      .catch(error => next(error))
});
  
  // UPDATE DB BUSINESS DATA //

router.post('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { businessName, businessType, city, email, password  } = req.body;
  Business.findByIdAndUpdate(id, { businessName, businessType, city, email, password  }, { new: true })
    .then(() => res.redirect('/business'))
    .catch(error => next(error));
});  

// RENDER ADD PRODUCT FORM //
router.get('/:id/product', (req, res) => {
  const {id} = req.params;
  res.render('business/add-product', {id});
});

router.post('/:id/product', (req, res, next) => {
  const {id} = req.params;
  const {price, description} = req.body;
  Product.create({businessName: id, price, description})
    .then(()=> res.redirect('/business'))
    .catch(err => next(err));
});

module.exports = router;
