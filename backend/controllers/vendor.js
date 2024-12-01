const Vendor = require('../models/vendor')

exports.getVendors = async (req, res, next) => {
  try {
    const vendors = await Vendor.find({})

    res.json(vendors)
  } catch (error) {
    next(error)
  }
}
