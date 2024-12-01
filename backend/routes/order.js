const express = require('express')
const router = express.Router()

const isAuth = require('../controllers/isAuth.js')
const order = require('../controllers/order.js')

router.get('/vendors', isAuth, order.getSalesByVendor)

module.exports = router
