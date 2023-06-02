import jwt from 'jsonwebtoken'

import Comment from '../models/Comment.js'

export const sendComment = (request, response) => {
  const { token } = request.cookies
  const { id, comment } = request.body

  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
      if (error) throw error

      const productsDoc = await Comment.create({
        owner: userData.id,
        product: id,
        content: comment,
      })
      response.json(productsDoc)
    })
  } catch (error) {
    response.status(404).json('error')
  }
}

export const getComments = async (request, response) => {
  const { id } = request.params

  try {
    response.json(await Comment.find({ product: id }).populate('owner'))
  } catch (error) {
    response.status(404).json('error')
  }
}
