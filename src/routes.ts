import express from 'express';
import productController from './product/product.controller';

const router = express.Router();

router.use('/product', productController);

export default router;
