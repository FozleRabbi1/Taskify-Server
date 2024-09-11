import express from 'express';
import { projectsControllers } from './Projects.controller';

const router = express.Router();

router.put('/:id', projectsControllers.updatesProjectsInfo);
router.get('/', projectsControllers.getAllProjects);
router.get('/favourite', projectsControllers.getAllFavourite);
router.delete('/', projectsControllers.deleteProjects);
router.patch('/:id', projectsControllers.updateFavouriteProjects);


export const projectsRouter = router;
