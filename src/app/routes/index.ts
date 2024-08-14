import express from 'express';
import { productsRouter } from '../modules/Products/Products.routes';
import { addToCartRouter } from '../modules/addToCard/AddToCart.routes';
const router = express.Router();

const moduleRoutes = [
  { path: '/products', route: productsRouter },
  { path: '/cart', route: addToCartRouter },
];

moduleRoutes.forEach((pathRouter) =>
  router.use(pathRouter.path, pathRouter.route),
);

export default router;
