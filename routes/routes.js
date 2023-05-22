import { Router } from 'express'
import { allProduct, oneProduct } from '../controllers/products.js'
import {
  logOutUser,
  loginUser,
  profileUser,
  registerUser,
} from '../controllers/user.js'

const router = Router()

router.get('/products', allProduct)
router.get('/products/:id', oneProduct)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', profileUser)
router.post('/logout', logOutUser)

export default router
