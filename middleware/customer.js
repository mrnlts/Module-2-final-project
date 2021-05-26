const isCustomer = (req, res, next) => {
    if (req.session.currentUser.role === 'customer') {
      console.log("CUSTOMER IS ", req.session.currentUser)
      return next();
    }
    console.log("BUSINESS")
    return res.redirect('/business/profile');
  };
  
  module.exports = isCustomer;