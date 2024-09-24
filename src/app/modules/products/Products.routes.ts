import express from 'express';
import { productControllers } from './Products.controller';

const router = express.Router();

router.get('/payment', productControllers.paymentWithPal);
router.get('/success', productControllers.getAllProducts);

router.get('/failed', async (req, res) => {
    return res.redirect("http://localhost:5173/failed");
})

router.get('/', productControllers.getAllProducts);

export const ProductsRouter = router;
