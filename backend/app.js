const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

const saleRoutes = require('./routes/order')
const parentProduct = require('./routes/parentProduct')
const vendor = require('./routes/vendor')
const authRoutes = require('./routes/auth')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/auth', authRoutes)
app.use('/sales', saleRoutes)
app.use('/parent-products', parentProduct)
app.use('/vendors', vendor)

app.use(errorHandler)

mongoose.set('strictQuery', true)

mongoose
  .connect(config.mongodbURI)
  .then(_result => {
    const port = config.port || 8080
    console.log('Connected to the port ', port)
    app.listen(port)
  })
  .catch(err => console.log(err))
