import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import fs from 'fs'
import { validationResult } from 'express-validator'

import User from '../models/User.js'

const salt = bcrypt.genSaltSync(10)
dotenv.config()

export const registerUser = async (request, response) => {
  const { email, password, name } = request.body

  const validationErrors = validationResult(request)

  if (!validationErrors.isEmpty()) {
    return response.status(400).json(validationErrors.array())
  }

  try {
    const userDoc = await User.create({
      email,
      password: bcrypt.hashSync(password, salt),
      name,
    })
    response.status(200).json(userDoc)
  } catch (error) {
    response.status(422).json(error)
  }
}

export const loginUser = async (request, response) => {
  const { email, password } = request.body

  try {
    const userDoc = await User.findOne({ email })

    if (userDoc) {
      const passwordIsOkay = bcrypt.compareSync(password, userDoc.password)

      if (passwordIsOkay) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          process.env.JWT_SECRET,
          {},
          (error, token) => {
            if (error) throw Error
            response.cookie('token', token).json(userDoc)
          }
        )
      } else {
        response
          .status(422)
          .json('Email address/password do not match any existing accounts.')
      }
    } else {
      response.status(403).json('The account not found ')
    }
  } catch (error) {
    response.status(422).json(error)
  }
}

export const profileUser = (request, response) => {
  const { token } = request.cookies
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
        if (error) throw error
        const { email, password, name, _id, avatar } = await User.findById(
          userData.id
        )

        response.status(200).json({ email, password, name, _id, avatar })
      })
    }
  } catch (error) {
    response.status(422).json(null)
  }
}

export const logOutUser = (request, response) => {
  try {
    response.cookie('token', '').json(true)
  } catch (error) {
    response.status(422).json(null)
  }
}

export const changeUserAvatar = async (request, response) => {
  try {
    const filter = { _id: request.body._id }
    const update = { avatar: request.body.avatar }

    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    })

    response.status(200).json(updatedUser)
  } catch (error) {
    response.status(422).json(null)
  }
}
