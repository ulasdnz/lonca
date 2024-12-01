const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const CustomError = require('../errors/index.js')

const User = require('../models/user')

exports.signup = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new CustomError(errors.array()[0].msg, 422)
  }
  const email = req.body.email
  const name = req.body.name
  const vendorId = req.body.vendor
  const password = req.body.password

  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email,
        password: hashedPw,
        name,
        vendorId,
      })
      return user.save()
    })
    .then(result => {
      const token = jwt.sign(
        {
          email: result.email,
          vendorId: result.vendorId,
          userId: result._id.toString(),
        },
        process.env.TOKENSECRET,
      )
      res.status(201).json({ message: 'User has been created!', token, user: result })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.login = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  let loadedUser
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        throw new CustomError('Email or password is wrong!', 401)
      }
      loadedUser = user
      return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
      if (!isEqual) {
        throw new CustomError('Email or password is wrong!', 401)
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          vendorId: loadedUser.vendorId,
          userId: loadedUser._id.toString(),
        },
        process.env.TOKENSECRET,
      )
      res.status(200).json({ token: token, user: loadedUser })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
