import express from 'express';
import { NotesControllers } from './Notes.controller';

const router = express.Router();

router.post('/', NotesControllers.createNots );
router.get('/', NotesControllers.getAllNotes );
router.delete('/:id', NotesControllers.deleteNote );
router.patch('/:id', NotesControllers.updateNote );


export const NotesRouter = router;
