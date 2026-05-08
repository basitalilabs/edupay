const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Server Error'

  // mongoose bad ObjectId
  if (err.name === 'CastError') {
    statusCode = 404
    message = 'Resource not found'
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 400
    message = 'Email already registered'
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token'
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Token expired, please login again'
  }

  res.status(statusCode).json({
    success: false,
    message
  })
}

module.exports = errorHandler