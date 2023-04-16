const errorHandeler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    msg: error.message,
  });
};

module.exports = errorHandeler;
