const { Schema, model, models } = require('mongoose')

const OrderSchema = new Schema(
  {
    cart_item: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'ParentProduct', required: true },
        variantId: { type: Schema.Types.ObjectId, required: true },
        series: { type: String },
        item_count: { type: Number, required: true },
        quantity: { type: Number, required: true },
        cogs: { type: Number, required: true },
        price: { type: Number, required: true },
        vendor_margin: { type: Number },
        order_status: {
          type: String,
          enum: ['Received', 'Confirmed', 'StockOut', 'Returned', 'Reviewed', 'StockIn', 'Supplier Return'],
          required: true,
          default: 'Received',
        },
      },
    ],
    payment_at: { type: Date, required: true },
  },
  { timestamps: true },
)

module.exports = models.Order || model('Order', OrderSchema)
