import express from 'express';
import { productControllers } from './Products.controller';

const router = express.Router();

router.get('/', productControllers.getAllProducts);


export const ProductsRouter = router;
