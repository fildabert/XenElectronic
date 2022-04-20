import mongoose, { Schema, Model, Document } from 'mongoose';
import { Cart, CartStatus } from './cart.type';

export type CartDocument = Cart & Document;

const itemsSchema = new Schema({
  productId: {
    type: String,
  },
  quantity: {
    type: Number,
  },
}, { _id: false });

const cartSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    items: {
      type: [itemsSchema],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(CartStatus),
    },
  },
  { versionKey: false },
);

export const CartModel: Model<CartDocument> = mongoose.model('cart', cartSchema);
