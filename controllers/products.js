import imageDownloader from 'image-downloader'

import Product from '../models/Products.js'

export const allProduct = (request, response) => {}

export const oneProduct = (request, response) => {}

export const photoLink = async (request, response) => {
  const { link } = request.body

  try {
    const newName = 'photo' + Date.now() + '.jpg'

    await imageDownloader.image({
      url: link,
      dest:
        '/Users/orkhanrahimli/Documents/Study/atlas-wear/server' +
        '/uploads/' +
        newName,
    })

    response.json(newName)
  } catch (error) {
    response.status(404).json('error')
  }
}
