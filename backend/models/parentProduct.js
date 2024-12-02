const { Schema, model, models } = require('mongoose')

const ParentProductSchema = new Schema({
  name: { type: String, required: true },
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
})

module.exports = models.ParentProduct || model('ParentProduct', ParentProductSchema)
