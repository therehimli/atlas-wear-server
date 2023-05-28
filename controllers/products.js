import Product from '../models/Products.js'

export const allProducts = async (request, response) => {
  response.json(await Product.find())
}

export const oneProduct = async (request, response) => {
  const { id } = request.params

  response.json(await Product.findById(id))
}
