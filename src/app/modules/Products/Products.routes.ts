import express from 'express';
import { productsControllers } from './Products.controller';
import { ProductValidationSchema } from './Products.validation';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(ProductValidationSchema.ProductSchema),
  productsControllers.createProduct,
);
router.get('/', productsControllers.getAllProducts);
router.patch(
  '/',
  validateRequest(ProductValidationSchema.UpdateProductSchema),
  productsControllers.updateProduct,
);
router.delete('/:id', productsControllers.deleteProduct);

export const productsRouter = router;
