import express from 'express';
import { TagsController } from './Tags.controller';

const router = express.Router();

router.get('/', TagsController.getAllTags);


export const TagsRouter = router;
