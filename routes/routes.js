import { Router } from 'express'
import { allProduct, oneProduct, photoLink } from '../controllers/products.js'
import {
  logOutUser,
  loginUser,
  profileUser,
  registerUser,
} from '../controllers/user.js'

const router = Router()

router.get('/products', allProduct)
router.get('/products/:id', oneProduct)
router.post('/photo-link', photoLink)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', profileUser)
router.post('/logout', logOutUser)

export default router
