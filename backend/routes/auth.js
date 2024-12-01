const express = require('express')
const { body } = require('express-validator')

const User = require('../models/user')
const authController = require('../controllers/auth')

const router = express.Router()

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { _req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('This email address is already in use!')
          }
        })
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long!'),
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long!'),
  ],
  authController.signup,
)

router.post('/login', authController.login)

module.exports = router
