import { Router } from 'express'
import multer from 'multer'

import { allProducts, oneProduct } from '../controllers/products.js'
import {
  allAccommodations,
  photoLink,
  uploadPhoto,
  editAccommodation,
  getAccommodationId,
  createAccommodation,
} from '../controllers/accommodations.js'
import {
  logOutUser,
  loginUser,
  profileUser,
  registerUser,
} from '../controllers/user.js'

const router = Router()
const photosMiddleware = multer({
  dest: 'uploads/',
})

router.get('/products', allProducts)
router.get('/products/:id', oneProduct)

router.post('/user-products', createAccommodation)
router.get('/user-products', allAccommodations)
router.get('/user-products/:id', getAccommodationId)
router.put('/user-products', editAccommodation)

router.post('/photo-link', photoLink)
router.post('/upload', photosMiddleware.array('photos', 100), uploadPhoto)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', profileUser)
router.post('/logout', logOutUser)

export default router
