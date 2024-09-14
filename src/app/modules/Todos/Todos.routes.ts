import express from 'express';
import { TodosController } from './Todos.controller';

const router = express.Router();

router.get('/', TodosController.getAllTodos);


export const TodosRouter = router;
