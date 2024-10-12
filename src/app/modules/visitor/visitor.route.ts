import express from 'express';
import { visitorController } from './visitor.controller';

const router = express.Router();

router.get('/', visitorController.GetVisitorCounter );

router.patch('/', visitorController.visitorCounterAddFunction );

export const VisitorRouter = router;
