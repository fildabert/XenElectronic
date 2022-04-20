import request from 'supertest';
import { ErrorCode, errorMap } from '../../error';
import app from '../../app';
import cartService from '../cart.service';
import cartData from './__mocks__/cart.data';

describe('product.controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('POST /cart', () => {
    it('should return 201 if successfully created', async () => {
      cartService.upsertCart = jest
        .fn()
        .mockResolvedValueOnce([cartData.mockActiveCart]);
      const response = await request(app)
        .post('/cart')
        .send(cartData.cartPayload);

      expect(cartService.upsertCart).toBeCalledWith(cartData.cartPayload);
      expect(response.statusCode).toEqual(201);
      expect(response.body.message).toEqual('Cart upserted');
    });

    it('should return 400 if there are validation errors', async () => {
      cartService.upsertCart = jest.fn();
      const response = await request(app)
        .post('/cart')
        .send({});

      expect(cartService.upsertCart).toBeCalledTimes(0);
      expect(response.statusCode).toEqual(errorMap[ErrorCode.VALIDATION_ERRORS].code);
      expect(response.body.message).toEqual(errorMap[ErrorCode.VALIDATION_ERRORS].message);
    });
  });

  describe('GET /cart/:username', () => {
    it('should return 200 if successfully fetch', async () => {
      cartService.getCart = jest
        .fn()
        .mockResolvedValueOnce([cartData.mockActiveCart]);
      const response = await request(app)
        .get('/cart/mockUsername');

      expect(cartService.getCart).toBeCalledWith('mockUsername');
      expect(response.statusCode).toEqual(200);
      expect(response.body.message).toEqual('Cart fetched');
    });

    it('should return 400 if there are validation errors', async () => {
      cartService.getCart = jest.fn();
      const response = await request(app)
        .get('/cart/a');

      expect(cartService.getCart).toBeCalledTimes(0);
      expect(response.statusCode).toEqual(errorMap[ErrorCode.VALIDATION_ERRORS].code);
      expect(response.body.message).toEqual(errorMap[ErrorCode.VALIDATION_ERRORS].message);
    });
  });

  describe('POST /cart/checkout', () => {
    it('should return 201 if successfully created', async () => {
      cartService.checkoutCart = jest
        .fn()
        .mockResolvedValueOnce([cartData.mockActiveCart]);
      const response = await request(app)
        .post('/cart/checkout')
        .send({ username: cartData.cartPayload.username });

      expect(cartService.checkoutCart).toBeCalledWith(cartData.cartPayload.username);
      expect(response.statusCode).toEqual(201);
      expect(response.body.message).toEqual('Cart checkout successful');
    });

    it('should return 400 if there are validation errors', async () => {
      cartService.checkoutCart = jest.fn();
      const response = await request(app)
        .post('/cart/checkout')
        .send({});

      expect(cartService.checkoutCart).toBeCalledTimes(0);
      expect(response.statusCode).toEqual(errorMap[ErrorCode.VALIDATION_ERRORS].code);
      expect(response.body.message).toEqual(errorMap[ErrorCode.VALIDATION_ERRORS].message);
    });
  });
});
