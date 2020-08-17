import { Router } from 'express';
import { uuid } from 'uuidv4';

const expensesRouter = Router();
const expenses = [];

expensesRouter.post('/', (request, response) => {
  const {
    description,
    value,
    automaticDebit,
    dueDate,
    obs,
    installments,
    paid,
    recurrent,
  } = request.body;

  const expense = {
    id: uuid(),
    description,
    value,
    automaticDebit,
    dueDate,
    obs,
    installments,
    paid,
    recurrent,
  };

  expenses.push(expense);

  return response.json(expense);
});

export default expensesRouter;
