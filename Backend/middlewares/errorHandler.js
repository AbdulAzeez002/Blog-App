//Not found
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  
  //Err handler
  const errorHandler = (err, req, res, next) => {
    // console.log(err.message,'kkkkkkkkkk');
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // console.log(res.statusCode,'code');
    res.status(statusCode);
    res.json({
      message: err?.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  module.exports = { errorHandler, notFound };