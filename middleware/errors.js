const errors = (req, res, next) => {
    req.flash('blank', 'You have to fill all the fields');
    req.flash('wrongPassw', 'Incorrect password');
    req.flash('unknown', 'Wrong password or username');
    // req.local
}

module.exports = errors;