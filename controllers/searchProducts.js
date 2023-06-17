import Product from '../models/Product.js'

export const searchProducts = async (request, response) => {
  const { minPrice, maxPrice, gender, match, category, search } = request.query
  try {
    if (!!gender || !!minPrice || !!maxPrice || (!!category && !search)) {
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
          .exec()
      )
    } else {
      response.json(await Product.find())
    }
  } catch (error) {
    response.status(404).json('error')
  }
}
