import express from 'express';
import { NotesControllers } from './Notes.controller';

const router = express.Router();

router.post('/', NotesControllers.createNots );
router.get('/', NotesControllers.getAllNotes );


export const NotesRouter = router;
