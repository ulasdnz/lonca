const mongoose = require('mongoose')
const Order = require('../models/order')
const CustomError = require('../errors/index.js')

const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id)
const createObjectId = id => mongoose.Types.ObjectId.createFromHexString(id)

exports.getSalesByVendor = async (req, res, next) => {
  try {
    const { groupBy, productId } = req.query
    const vendorId = req.vendorId
    const queries = [{ $unwind: '$cart_item' }]

    if (typeof productId === 'string') {
      if (!isValidObjectId(productId)) {
        throw new CustomError('Product id is not valid!', 400)
      }
      const productObjectId = createObjectId(productId)
      queries.push(getMatchStageForProduct(productObjectId), ...arrangeGroupByQuery(groupBy))
    } else {
      const vendorObjectId = createObjectId(vendorId) // No need to check since its coming from the token
      queries.push(getLookupStageForProduct(), { $unwind: '$product' }, getMatchStageForVendor(vendorObjectId), ...arrangeGroupByQuery(groupBy))
    }

    const sales = await Order.aggregate(queries)
    res.json(sales)
  } catch (error) {
    next(error)
  }
}

const getLookupStageForProduct = () => ({
  $lookup: {
    from: 'parentproducts',
    localField: 'cart_item.product',
    foreignField: '_id',
    as: 'product',
  },
})

const getMatchStageForVendor = vendor => ({
  $match: { 'product.vendor': vendor },
})

const getMatchStageForProduct = product => ({
  $match: { 'cart_item.product': product },
})

const arrangeGroupByQuery = groupBy => {
  switch (groupBy) {
    case 'month':
      return getMonthlyGroupByQueries()
    case 'product':
      return getProductGroupByQueries()
    default:
      return []
  }
}

const getMonthlyGroupByQueries = () => [
  {
    $project: {
      date: { $dateToString: { format: '%Y-%m', date: '$payment_at' } },
      price: '$cart_item.price',
      quantity: '$cart_item.quantity',
      item_count: '$cart_item.item_count',
    },
  },
  {
    $group: {
      _id: '$date',
      price: { $sum: { $multiply: ['$quantity', '$price', '$item_count'] } },
    },
  },
  {
    $project: {
      date: '$_id',
      price: { $round: ['$price', 2] },
      _id: 0,
    },
  },
  { $sort: { date: 1 } },
]

const getProductGroupByQueries = () => [
  {
    $group: {
      _id: '$product._id',
      totalSaleNumber: { $sum: { $multiply: ['$cart_item.item_count', '$cart_item.quantity'] } },
      totalPrice: { $sum: { $multiply: ['$cart_item.quantity', '$cart_item.item_count', '$cart_item.price'] } },
    },
  },
  {
    $lookup: {
      from: 'parentproducts',
      localField: '_id',
      foreignField: '_id',
      as: 'product',
    },
  },
  { $unwind: '$product' },
  {
    $project: {
      _id: 0,
      productId: '$_id',
      name: '$product.name',
      totalSaleNumber: 1,
      totalPrice: { $round: ['$totalPrice', 2] },
    },
  },
]
