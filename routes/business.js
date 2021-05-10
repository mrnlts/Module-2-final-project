const express = require('express');
const router = express.Router();
const Business = require('../models/Business.model');

router.get('/', (req, res, next) => {
    res.render('business/mainPage');
})

// FIND BUSINESS BY ID AND RENDER UPDATE FORM // 

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
  
  // UPDATE BUSINESS DATA //

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
