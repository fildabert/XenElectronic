import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { CartModel } from '../cart.model';
import cartRepository from '../cart.repository';
import { CartStatus } from '../cart.type';
import cartData from './__mocks__/cart.data';

jest.mock('mongoose', () => {
  const jestMongoose = jest.requireActual('mongoose');
  return new jestMongoose.Mongoose(); // new mongoose instance and connection for each test
});

describe('cart.repository', () => {
  let mongod: MongoMemoryServer;

  const insertCartToDb = async () => cartRepository.createCart(cartData.cartPayload);

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const mongoDbUri = await mongod.getConnectionString();
    await mongoose.connect(mongoDbUri, {});
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await CartModel.remove({});
  });

  afterAll(async () => {
    mongoose.disconnect();
    mongod.stop();
  });

  describe('createCart and findCart', () => {
    it('should insert 1 document to db', async () => {
      await insertCartToDb();

      const result = await cartRepository.findCart(cartData.cartPayload.username);

      expect(result).toBeDefined();
      expect(result?.status).toEqual('ACTIVE');
    });
  });

  describe('updateCart', () => {
    it('should update cart items', async () => {
      await insertCartToDb();

      await cartRepository.updateCart(cartData.updateCartPayload);

      const result = await cartRepository.findCart(cartData.cartPayload.username);

      expect(result).toBeDefined();
      expect(result?.status).toEqual('ACTIVE');
      expect(result?.items[0].quantity).toEqual(cartData.updateCartPayload.items[0].quantity);
    });

    it('should return null if document is not found in db', async () => {
      await insertCartToDb();

      const result = await cartRepository.updateCart({ ...cartData.updateCartPayload, username: 'user2' });

      expect(result).toEqual(null);
    });
  });

  describe('updateCartStatus', () => {
    it('should update cart status', async () => {
      await insertCartToDb();

      await cartRepository.updateCartStatus({ username: 'username', status: CartStatus.DONE });

      const result = await cartRepository.findCart(cartData.cartPayload.username);

      expect(result).toEqual(null);
    });
  });
});
