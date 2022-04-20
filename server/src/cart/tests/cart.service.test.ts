import AppError, { ErrorCode } from '../../error';
import cartRepository from '../cart.repository';
import cartService from '../cart.service';
import { CartStatus } from '../cart.type';
import cartData from './__mocks__/cart.data';

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
      cartRepository.updateCartStatus = jest.fn();

      await cartService.checkoutCart(cartData.cartPayload.username);

      expect(cartRepository.updateCartStatus).toBeCalledWith({
        username: cartData.cartPayload.username,
        status: CartStatus.DONE,
      });
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
