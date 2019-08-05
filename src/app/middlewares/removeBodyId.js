export default (req, res, next) => {
  delete req.body.id;
  return next();
};
