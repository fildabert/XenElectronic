import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { ProductModel } from '../product.model';
import productRepository from '../product.repository';
import { Product } from '../product.type';
import productData from './__mocks__/product.data';

jest.mock('mongoose', () => {
  const jestMongoose = jest.requireActual('mongoose');
  return new jestMongoose.Mongoose(); // new mongoose instance and connection for each test
});

describe('product.repository', () => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const mongoDbUri = await mongod.getConnectionString();
    await mongoose.connect(mongoDbUri, {});
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await ProductModel.remove({});
  });

  afterAll(async () => {
    mongoose.disconnect();
    mongod.stop();
  });

  describe('createProduct and findProduct', () => {
    it('should insert 1 product to db', async () => {
      await productRepository.createProduct(productData.productPayload);

      const product = await productRepository.getProducts() as Omit<Product, 'id' | '_id'>[];

      expect(product.length).toBe(1);
      expect(product[0].category).toEqual(productData.productPayload.category);
    });
  });
});
