module.exports = (req, res, next) => {
  if (req && req.session && req.session.admin ) {
    next();
  }else {
    return res.status(404).send("Please Login");
   
  }
};
