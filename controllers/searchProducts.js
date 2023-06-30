import Product from '../models/Product.js'

export const searchProducts = async (request, response) => {
  const { minPrice, maxPrice, gender, match, category, page } = request.query
  const categoryIsNull = category === 'null' ? false : true
  try {
    if (!!gender || !!minPrice || !!maxPrice || categoryIsNull) {
      response.json(
        await Product.find({
          category: category,
          $or: [
            {
              gender: gender,
            },
            {
              category: category,
            },
            {
              price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
            },
          ],
        })
          .sort({ price: match })
          .populate('owner')
          .limit(page)
          .skip(page)
          .exec()
      )
    } else {
      response.json(await Product.find().limit(page))
    }
  } catch (error) {
    response.status(404).json('error')
  }
}
