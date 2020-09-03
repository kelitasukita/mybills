import { Router, request, response } from 'express';

import CreateExpenseService from '../services/CreateExpenseService';

const expensesRouter = Router();

expensesRouter.post('/', async (request, response) => {
  try {
    const { description, value, automaticDebit, dueDate, obs, currentInstallment, installments, paid, recurrent } = request.body;

    const createExpense = new CreateExpenseService();

    const expense = await createExpense.execute({
      description,
      value,
      automaticDebit,
      dueDate,
      obs,
      currentInstallment,
      installments,
      paid,
      recurrent
    })
     return response.json(expense);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default expensesRouter;

