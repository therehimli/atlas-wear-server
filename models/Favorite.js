import mongoose from 'mongoose'

const Schema = mongoose.Schema

const FavoriteSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  },
  {
    timestamps: true,
  }
)

const Favorite = mongoose.model('Favorite', FavoriteSchema)

export default Favorite
