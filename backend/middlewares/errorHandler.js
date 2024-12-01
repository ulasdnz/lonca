const errorHandler = (error, _req, res, _next) => {
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message: message, data: data })
}

module.exports = errorHandler
