import mongoose, { Schema, Model, Document } from 'mongoose';
import { Product } from './product.type';

export type ProductDocument = Product & Document;

export const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export const ProductModel: Model<ProductDocument> = mongoose.model('product', productSchema);
