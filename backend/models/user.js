const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'User must have an email'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'User must have a name'],
      trim: true,
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
      required: [true, 'Vendor is required'],
    },
    password: {
      type: String,
      required: [true, 'User must have a password'],
      trim: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)
