import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  avatar: String,
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
