import mongoose, { Schema, Model, Document } from 'mongoose';
import { productSchema } from '../product/product.model';
import { Cart, CartStatus } from './cart.type';

export type CartDocument = Cart & Document;

const itemsSchema = new Schema({
  ...productSchema.obj,
  quantity: {
    type: Number,
  },
});

const cartSchema = new Schema(
  {
    userId: {
      type: String,
      default: 'mockUserId',
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
);

export const CartModel: Model<CartDocument> = mongoose.model('cart', cartSchema);
