import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    contactEmail: { type: String, required: true },
    photos: [String],
    sizes: [String],
    viewsCount: { type: Number, default: 0 },
    colors: [String],
    description: String,
    state: String,
    delivery: String,
    city: String,
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
