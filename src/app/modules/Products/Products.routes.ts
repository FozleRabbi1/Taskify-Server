import express from 'express';
import { productsControllers } from './Products.controller';

const router = express.Router();

router.get('/', productsControllers.getAllProducts);

export const productsRouter = router;
