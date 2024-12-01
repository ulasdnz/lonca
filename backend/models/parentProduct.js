const { Schema, model, models } = require('mongoose')

const ParentProductSchema = new Schema({
  name: { type: String, required: true },
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
})

// ParentProductSchema.pre(/^find/, function (next) {
//   this.populate([
//     {
//       path: 'vendor',
//       select: 'name ',
//     },
//   ])
//   next()
// })

module.exports = models.ParentProduct || model('ParentProduct', ParentProductSchema)
