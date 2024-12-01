const { Schema, model, models } = require('mongoose')

const VendorSchema = new Schema({
  name: { type: String, required: true },
})

module.exports = models.Vendor || model('Vendor', VendorSchema)
