import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    content: { type: String },
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment
