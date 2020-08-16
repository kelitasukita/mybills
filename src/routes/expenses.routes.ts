import { Router } from 'express';

const expensesRouter = Router();

expensesRouter.post('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

export default expensesRouter;
