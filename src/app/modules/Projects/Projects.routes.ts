import express from 'express';
import { projectsControllers } from './Projects.controller';

const router = express.Router();

router.get('/', projectsControllers.getAllProjects);
router.delete('/', projectsControllers.deleteProjects);
router.patch('/:id', projectsControllers.updateFavouriteProjects);

// router.post(
//   '/',
//   validateRequest(ProductValidationSchema.ProductSchema),
//   productsControllers.createProduct,
// );
// router.patch(
//   '/',
//   validateRequest(ProductValidationSchema.UpdateProductSchema),
//   productsControllers.updateProduct,
// );
// router.delete('/:id', productsControllers.deleteProduct);

export const projectsRouter = router;
