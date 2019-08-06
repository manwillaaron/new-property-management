module.exports = (req, res, next) => {
  if (!req.session.admin.loggedIn) {
    return res.status(401).send("Not authorized");
  }
  next();
};
