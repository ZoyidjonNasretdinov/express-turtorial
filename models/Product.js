import { model, Schema } from 'mongoose'

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const Product = model('ProductSchema', ProductSchema)

export default Product