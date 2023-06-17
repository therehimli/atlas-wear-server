import jwt from 'jsonwebtoken'
import Favorite from '../models/Favorite.js'
import Product from '../models/Product.js'

export const addFavorite = async (request, response) => {
  const { productId } = request.body
  const { token } = request.cookies

  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
      if (error) throw error

      const FavoriteDoc = await Favorite.create({
        owner: userData.id,
        product: productId,
      })
      await Product.findByIdAndUpdate(
        { _id: productId },
        {
          favorite: true,
        }
      )
      response.json(FavoriteDoc)
    })
  } catch (error) {
    response.status(404).json('error')
  }
}

export const deleteFavorite = async (request, response) => {
  const { id: _id } = request.params
  const { token } = request.cookies

  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
      if (error) throw error

      await Favorite.findOneAndDelete({ product: _id })
      await Product.findByIdAndUpdate(
        { _id },
        {
          favorite: false,
        }
      )

      response.json('deleted')
    })
  } catch (error) {
    response.status(404).json('error')
  }
}

export const getFavorites = async (request, response) => {
  const { token } = request.cookies
  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
      if (error) {
        response.status(403).json('')
      } else {
        response.json(
          await Favorite.find({ owner: userData.id }).populate('product')
        )
      }
    })
  } catch (error) {
    response.status(404).json('error')
  }
}
