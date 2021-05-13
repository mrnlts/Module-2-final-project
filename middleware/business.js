
const isBusiness = (req, res, next) => {
    if (req.session.currentUser && req.session.currentUser.role === 'business') {
      return next;
    }
    return res.redirect('/user/profile');
  };
  
  module.exports = isBusiness;