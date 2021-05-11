const express = require('express');
const router = express.Router();
const Business = require('../models/Business.model');
const Product = require('../models/Product.model');
const Order = require('../models/Order.model');

// RENDER BUSINESS HOME PAGE //
router.get('/:id', (req, res, next) => {
  const {id} = req.params;
  Business.findById({"_id": id})
    .then(businessFromDB => {
      Product.find({businessName: id})
        .then((selected) => {
          let currentOrders = [];
          selected.forEach(prod => {
            console.log("PROD id: ", prod.id);
            Order.find({"product": prod.id})
            .populate('user product')
            .then((ordersFromDB) => {
              ordersFromDB.forEach((order)=> {
                currentOrders.push(order)
              });
            })
          })
          console.log("current orders: ", currentOrders);
          res.render('business/mainPage', {businessFromDB, currentOrders});
        })    
    })
    .catch(err => next(err));
});


// RENDER BUSINESS EDIT PAGE // 

router.get('/:id/edit', (req, res, next) => {
  console.log("Enter edit business");
    const { id } = req.params;
    console.log("Business id: ", id)
    Business.findById(id)
      .then(dbBusiness => {
        console.log(dbBusiness);
       res.render('business/edit-form', { dbBusiness });
      })
      .catch(error => next(error));
  });
  
  // UPDATE DB BUSINESS DATA //

  router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { businessName, businessType, city, email, password  } = req.body;
    Business.findByIdAndUpdate(id, { businessName, businessType, city, email, password  }, { new: true })
      .then(dbBusiness => {     
        res.redirect('/business');
        console.log('update', dbBusiness);
      })
      .catch(error => {
        next(error);
      });
  });  

// RENDER ADD PRODUCT FORM //
router.get('/:id/product', (req, res, next) => {
  const {id} = req.params;
  res.render('business/add-product', {id});
});

router.post('/:id/product', (req, res, next) => {
  const {id} = req.params;
  const {price, description} = req.body;
  Product.create({businessName: id, price, description})
    .then((productFromDB)=> {
      console.log("new product added!: ", productFromDB);
      res.redirect('/business');
    })
    .catch(err => next(err));
});

// DELETE BUSINESS ///
// router.post('/:id', (req, res, next) => {
//     const { id } = req.params;
//     Business.findByIdAndDelete(id)
//       .then(dbBusiness => {
//         console.log('delete', dbBusiness);
//         res.status(301);
//         res.redirect('/business');
//       })
//       .catch(error => {
//         next(error);
//       });
//   });

module.exports = router;
