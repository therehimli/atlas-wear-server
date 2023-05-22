import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
