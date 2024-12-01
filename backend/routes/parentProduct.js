const express = require('express')
const router = express.Router()

const isAuth = require('../controllers/isAuth.js')
const parentProduct = require('../controllers/parentProduct.js')

router.get('/', isAuth, parentProduct.getParentProducts)

module.exports = router
