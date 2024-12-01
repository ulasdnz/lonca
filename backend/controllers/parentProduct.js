const ParentProduct = require('../models/parentProduct')

exports.getParentProducts = async (req, res, next) => {
  try {
    const parentProducts = await ParentProduct.find({})

    res.json(parentProducts)
  } catch (error) {
    next(error)
  }
}
