import { Router } from 'express'
import multer from 'multer'

import {
  allProducts,
  getSimilarProducts,
  oneProduct,
} from '../controllers/products.js'
import {
  allAccommodations,
  editAccommodation,
  getAccommodationId,
  createAccommodation,
  uploadProductPhoto,
  productPhotoLink,
  deleteAccommodation,
} from '../controllers/accommodations.js'
import {
  changeUserAvatar,
  logOutUser,
  loginUser,
  profileUser,
  registerUser,
} from '../controllers/user.js'
import { getComments, sendComment } from '../controllers/comments.js'
import { registerValidation } from '../validations/authValidation.js'
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from '../controllers/favorites.js'
import { searchProducts } from '../controllers/searchProducts.js'

const router = Router()

const productPhotosMiddleware = multer({
  dest: 'uploads/images/',
})

router.get('/products', allProducts)
router.get('/products/:id', oneProduct)
router.get('/similar-products/:category', getSimilarProducts)

router.post('/user-products', createAccommodation)
router.get('/user-products', allAccommodations)
router.get('/user-products/:id', getAccommodationId)
router.put('/user-products', editAccommodation)
router.delete('/user-products/:id', deleteAccommodation)

router.get('/search-products', searchProducts)

router.post('/product-photo-link', productPhotoLink)
router.post(
  '/upload-product-image',
  productPhotosMiddleware.array('photos', 100),
  uploadProductPhoto
)

router.post('/comments', sendComment)
router.get('/comments/:id', getComments)

router.post('/favorites', addFavorite)
router.delete('/favorites/:id', deleteFavorite)
router.get('/favorites', getFavorites)

router.post('/register', registerValidation, registerUser)
router.post('/login', loginUser)
router.get('/profile', profileUser)
router.post('/logout', logOutUser)
router.post('/change-avatar', changeUserAvatar)

export default router
