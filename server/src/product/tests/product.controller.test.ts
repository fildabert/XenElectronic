import request from 'supertest';
import AppError, { ErrorCode, errorMap } from '../../error';
import app from '../../server';
import productService from '../product.service';
import productData from './__mocks__/product.data';

describe('product.controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('POST /product', () => {
    it('should return 201 if successfully created', async () => {
      productService.createProduct = jest.fn().mockResolvedValueOnce([productData.productPayload]);
      const response = await request(app).post('/product').send(productData.productPayload);

      expect(productService.createProduct).toBeCalledWith(productData.productPayload);
      expect(response.statusCode).toEqual(201);
      expect(response.body.message).toEqual('Product created');
    });

    it('should return 400 if there are validation errors', async () => {
      const response = await request(app).post('/product').send({});

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toEqual(errorMap[ErrorCode.VALIDATION_ERRORS].message);
    });

    it('should return 500 if something went wrong during the process', async () => {
      productService.createProduct = jest
        .fn()
        .mockRejectedValueOnce(new AppError(ErrorCode.INTERNAL_SERVER_ERROR));
      const response = await request(app).post('/product').send(productData.productPayload);

      expect(response.statusCode).toEqual(500);
      expect(response.body.message).toEqual(errorMap[ErrorCode.INTERNAL_SERVER_ERROR].message);
    });
  });
});
