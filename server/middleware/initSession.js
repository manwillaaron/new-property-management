module.exports = (req, res, next) => {
    if (req.session && !req.session.admin) {
      req.session.admin = {};
    }
    next();
};
