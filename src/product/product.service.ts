import productRepository from './product.repository';
import { Product } from './product.type';

const createProduct = async (product: Product): Promise<Product> => {
  const result = await productRepository.createProduct(product);
  return result;
};

const getProducts = async(): Promise<Product[]> => {
  const result = productRepository.getProducts();
  return result;
}

const productService = { createProduct, getProducts };

export default productService;
