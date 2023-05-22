import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  photos: [String],
  sizes: [String],
  colors: [String],
  description: String,
})

const Product = mongoose.model('Product', productSchema)

export default Product
