import express from 'express';
import { TodosController } from './Todos.controller';

const router = express.Router();

router.get('/', TodosController.getAllTodos);
router.patch('/:id', TodosController.checkedTodos);


export const TodosRouter = router;
