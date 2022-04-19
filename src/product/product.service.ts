import productRepository from './product.repository';
import { Product } from './product.type';

const createProduct = async (product: Product): Promise<Product> => {
  const result = await productRepository.createProduct(product);
  return result;
};

const productService = { createProduct };

export default productService;
