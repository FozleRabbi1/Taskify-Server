import express from 'express';
import { TodosController } from './Todos.controller';

const router = express.Router();

router.delete('/delete', TodosController.deleteTodos);
router.patch('/updateTodo/:id', TodosController.updateTodos);
router.get('/', TodosController.getAllTodos);
router.patch('/:id', TodosController.checkedTodos);


export const TodosRouter = router;
