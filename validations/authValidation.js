import { body } from 'express-validator'

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({
    min: 5,
  }),
  body('name', 'Укажите имя').isLength({ min: 3 }),
  body('avatar', 'Неверная ссылка').optional().isURL(),
]
