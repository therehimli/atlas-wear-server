import Product from '../models/Product.js'

export const allProducts = async (request, response) => {
  const { limit } = request.query

  try {
    response.json(await Product.find().limit(limit).populate('owner').exec())
  } catch (error) {
    response.status(404).json('error')
  }
}

export const oneProduct = async (request, response) => {
  const { id } = request.params

  try {
    const doc = await Product.findOneAndUpdate(
      { _id: id },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )
      .populate('owner')
      .exec()
    response.json(doc)
  } catch (error) {
    response.status(404).json(error)
  }
}

export const getSimilarProducts = async (request, response) => {
  const { category } = request.params

  try {
    const doc = await Product.find({ category })
    response.status(202).json(doc)
  } catch (error) {
    response.json(error)
  }
}
