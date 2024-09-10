import express from 'express';
import { projectsControllers } from './Projects.controller';

const router = express.Router();

router.put('/:id', projectsControllers.updateStatusProjects);
router.get('/', projectsControllers.getAllProjects);
router.delete('/', projectsControllers.deleteProjects);
router.patch('/:id', projectsControllers.updateFavouriteProjects);


export const projectsRouter = router;
