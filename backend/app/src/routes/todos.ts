import { Router } from 'express';

import { deleteToDo, getAllToDo, getTodoById } from '../controllers/todos';

import authenticateUser from '../middlewares/validateAuth';

const router = Router();

// router.post('/', createToDo);

router.get('/', authenticateUser, getAllToDo);

router.get('/:id', getTodoById);

// router.put('/:id', updateTodo);

router.delete('/:id', deleteToDo);

export default router;
