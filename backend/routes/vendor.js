const express = require('express')
const router = express.Router()

const vendor = require('../controllers/vendor.js')

router.get('/', vendor.getVendors)

module.exports = router
