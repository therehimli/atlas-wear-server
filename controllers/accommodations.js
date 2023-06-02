import imageDownloader from 'image-downloader'
import jwt from 'jsonwebtoken'
import fs from 'fs'

import Product from '../models/Product.js'

export const createAccommodation = (request, response) => {
  const { token } = request.cookies

  const {
    title,
    price,
    category,
    photos,
    description,
    colors,
    sizes,
    gender,
    contactNumber,
    contactEmail,
    state,
    delivery,
  } = request.body

  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
      if (error) throw error
      const productsDoc = await Product.create({
        owner: userData.id,
        title,
        price,
        category,
        photos,
        description,
        colors,
        sizes,
        gender,
        contactNumber,
        contactEmail,
        state,
        delivery,
      })
      response.json(productsDoc)
    })
  } catch (error) {
    response.status(404).json('Пожалуйста авторизуйтесь')
  }
}

export const allAccommodations = (request, response) => {
  const { token } = request.cookies

  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
      const { id } = userData
      response.json(await Product.find({ owner: id }))
    })
  } catch (error) {
    response.status(404).json('Пожалуйста авторизуйтесь')
  }
}

export const getAccommodationId = async (request, response) => {
  const { id } = request.params
  response.json(await Product.findById(id))
}

export const editAccommodation = async (request, response) => {
  const { token } = request.cookies

  const {
    id,
    title,
    price,
    category,
    photos,
    description,
    colors,
    sizes,
    gender,
    contactNumber,
    contactEmail,
    state,
    delivery,
  } = request.body

  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
      if (error) throw error

      const productDoc = await Product.findById(id)
      if (userData.id === productDoc.owner.toString()) {
        productDoc.set({
          title,
          price,
          category,
          photos,
          description,
          colors,
          sizes,
          gender,
          contactNumber,
          contactEmail,
          state,
          delivery,
        })
        await productDoc.save()

        response.json('updated')
      }
    })
  } catch (error) {
    response.status(404).json('Пожалуйста авторизуйтесь')
  }
}

export const deleteAccommodation = async (request, response) => {
  const { id } = request.params

  try {
    await Product.findByIdAndDelete(id)

    response.status(200).json('deleted')
  } catch (error) {
    response.status(404).json('Пожалуйста авторизуйтесь')
  }
}

export const productPhotoLink = async (request, response) => {
  const { link } = request.body

  try {
    const newName = 'photo' + Date.now() + '.jpg'

    await imageDownloader.image({
      url: link,
      dest:
        '/Users/orkhanrahimli/Documents/Study/atlas-wear/server' +
        '/uploads/images/' +
        newName,
    })

    response.json(newName)
  } catch (error) {
    response.status(404).json('error')
  }
}

export const uploadProductPhoto = (request, response) => {
  try {
    const uploadedFiles = []
    for (let i = 0; i < request.files.length; i++) {
      const { path, originalname } = request.files[i]
      const parts = originalname.split('.')
      const extension = parts[parts.length - 1]
      const newPath = path + '.' + extension
      fs.renameSync(path, newPath)
      uploadedFiles.push(newPath.replace('uploads/images/', ''))
    }
    response.json(uploadedFiles)
  } catch (error) {
    response.status(404).json('error')
  }
}
