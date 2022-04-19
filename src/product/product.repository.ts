/* eslint-disable max-len */
import { ProductModel, ProductDocument } from './product.model';
import { Product } from './product.type';

const convertDocumentToObject = (document: ProductDocument) => document.toObject({ getters: true }) as Product;
// const mapDocumentsToArray = (documents: ProductDocument[]) => documents.map(convertDocumentToObject);

const createProduct = async (product: Product): Promise<Product> => {
  const result = await ProductModel.create(product);
  return convertDocumentToObject(result);
};

const productRepository = {
  createProduct,
};

export default productRepository;
