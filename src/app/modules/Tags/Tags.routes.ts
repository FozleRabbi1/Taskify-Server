import express from 'express';
import { TagsController } from './Tags.controller';

const router = express.Router();

router.get('/', TagsController.getAllTags);
router.patch('/:id', TagsController.updateTags);
router.delete('/', TagsController.deleteTags);


export const TagsRouter = router;
