const jwt = require('jsonwebtoken')
const CustomError = require('../errors/index.js')

module.exports = (req, _res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    throw new CustomError('Autharization header is missing', 400)
  }
  const token = authHeader.split(' ')[1]
  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.TOKENSECRET)
  } catch (err) {
    throw new CustomError('Interval server error', 500)
  }
  if (!decodedToken) {
    throw new CustomError("Couldn't authenticate user", 401)
  }
  req.loggedUserId = decodedToken.userId
  req.vendorId = decodedToken.vendorId
  next()
}
