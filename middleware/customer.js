const isCustomer = (req, res, next) => {
    if (req.session.currentUser.role === 'customer') {
      return next();
    } 
    return res.redirect('/business/profile');
  };
  
  module.exports = isCustomer;