import express from 'express';
import cartController from './cart/cart.controller';
import productController from './product/product.controller';

const router = express.Router();

router.use('/product', productController);
router.use('/cart', cartController);

export default router;
