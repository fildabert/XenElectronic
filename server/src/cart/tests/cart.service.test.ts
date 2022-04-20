/* eslint-disable max-classes-per-file */
// eslint-disable-next-line no-unused-vars
import Xendit from 'xendit-node';
import AppError, { ErrorCode } from '../../error';
import productRepository from '../../product/product.repository';
import productData from '../../product/tests/__mocks__/product.data';
import cartRepository from '../cart.repository';
import cartService from '../cart.service';
import { CartStatus } from '../cart.type';
import cartData from './__mocks__/cart.data';

jest.mock('xendit-node', () => {
  class Invoice {
    // eslint-disable-next-line class-methods-use-this
    public createInvoice = () => ({
      invoice_url: 'http://asd',
    });
  }
  class T {
    public Invoice = Invoice;
  }

  return T;
});
describe('cart.service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('upsertCart', () => {
    it('should call update if there is already an existing cart', async () => {
      cartRepository.findCart = jest
        .fn()
        .mockResolvedValueOnce(cartData.mockActiveCart);
      cartRepository.updateCart = jest.fn();

      await cartService.upsertCart(cartData.cartPayload);

      expect(cartRepository.updateCart).toBeCalledWith(cartData.cartPayload);
    });

    it('should call create if there is no existing cart', async () => {
      cartRepository.findCart = jest
        .fn()
        .mockResolvedValueOnce(null);
      cartRepository.createCart = jest.fn();

      await cartService.upsertCart(cartData.cartPayload);

      expect(cartRepository.createCart).toBeCalledWith(cartData.cartPayload);
    });
  });

  describe('getCart', () => {
    it('should call repository with correct payload', async () => {
      cartRepository.findCart = jest
        .fn()
        .mockResolvedValueOnce(cartData.mockActiveCart);

      await cartService.getCart(cartData.cartPayload.username);

      expect(cartRepository.findCart).toBeCalledWith(cartData.cartPayload.username);
    });

    it('should throw error if cart is not found', async () => {
      cartRepository.findCart = jest
        .fn()
        .mockResolvedValueOnce(null);

      try {
        await cartService.getCart(cartData.cartPayload.username);
      } catch (error) {
        expect(error).toEqual(new AppError(ErrorCode.CART_NOT_FOUND));
      }
    });
  });

  describe('checkoutCart', () => {
    it('should call repository with correct payload', async () => {
      cartRepository.findCart = jest
        .fn()
        .mockResolvedValueOnce(cartData.mockActiveCart);
      cartRepository.updateCartStatus = jest
        .fn()
        .mockResolvedValueOnce(cartData.mockCheckoutCart);
      productRepository.getProducts = jest
        .fn()
        .mockResolvedValueOnce([productData.productPayload]);

      await cartService.checkoutCart(cartData.cartPayload.username);

      expect(cartRepository.updateCartStatus).toBeCalledWith({
        username: cartData.cartPayload.username,
        status: CartStatus.DONE,
      });
    });

    it('should call repository with correct payload', async () => {
      cartRepository.findCart = jest
        .fn()
        .mockResolvedValueOnce(cartData.mockActiveCart);
      cartRepository.updateCartStatus = jest
        .fn();
      productRepository.getProducts = jest
        .fn()
        .mockResolvedValueOnce([productData.productPayload]);

      try {
        await cartService.checkoutCart(cartData.cartPayload.username);
      } catch (error) {
        expect(error).toEqual(new AppError(ErrorCode.INTERNAL_SERVER_ERROR));
      }
    });

    it('should throw error if cart is not found', async () => {
      cartRepository.findCart = jest
        .fn()
        .mockResolvedValueOnce(null);

      try {
        await cartService.checkoutCart(cartData.cartPayload.username);
      } catch (error) {
        expect(error).toEqual(new AppError(ErrorCode.CART_NOT_FOUND));
      }
    });
  });
});
