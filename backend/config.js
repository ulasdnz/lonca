require('dotenv').config()

const config = {
  mongodbURI: process.env.MONGODB_URI,
  port: process.env.PORT,
}

module.exports = config
