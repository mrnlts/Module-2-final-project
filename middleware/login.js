const isUserLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  }
  return res.redirect('/login');
};

// function isUserBusiness() => true o false

// const isBusinesLoggedIn = (req, res, next) => {
//   if (req.session.currentUser) {
//     if (isUserBusiness(req.session.currentUser)) {
//       return next();
//     } 
//     return res.redirect('/user/:id');
//   }
//   return res.redirect('/login');
// }

module.exports = isUserLoggedIn;