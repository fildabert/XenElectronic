import productService from '../product.service';
import productRepository from '../product.repository';
import productData from './__mocks__/product.data';

describe('product.service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('createProduct', () => {
    it('should call to productRepository.createProduct with correct arguments', async () => {
      productRepository.createProduct = jest.fn().mockResolvedValueOnce(productData.productPayload);

      const result = await productService.createProduct(productData.productPayload);

      expect(productRepository.createProduct).toBeCalledWith(productData.productPayload);
      expect(result).toEqual(productData.productPayload);
    });
  });

  describe('getProducts', () => {
    it('should call to productRepository.getProducts', async () => {
      productRepository.getProducts = jest.fn().mockResolvedValueOnce([productData.productPayload]);

      const result = await productService.getProducts();

      expect(productRepository.getProducts).toBeCalledTimes(1);
      expect(result.length).toBe(1);
    });
  });
});
