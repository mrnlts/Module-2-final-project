const isUserLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
      return next();
    }
    return res.redirect('/user/profile');
  };
  
  module.exports = isUserLoggedOut;
  