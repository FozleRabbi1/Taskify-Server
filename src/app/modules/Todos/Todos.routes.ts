import express from 'express';
import { TodosController } from './Todos.controller';

const router = express.Router();

router.patch('/updateTodo/:id', TodosController.updateTodos);
router.get('/', TodosController.getAllTodos);
router.patch('/:id', TodosController.checkedTodos);
router.delete('/', TodosController.deleteTodos);


export const TodosRouter = router;
