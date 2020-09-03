import { Router, request, response } from 'express';

import CreateExpenseService from '../services/CreateExpenseService';
import Expense from '../models/Expenses';
import { getRepository } from 'typeorm';

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

expensesRouter.get('/', async (request, response) => {
  return response.json(await getRepository(Expense).find())
});

expensesRouter.delete('/:id', async (request, response) => {
  return response.json(await getRepository(Expense).delete(request.params.id))
});

export default expensesRouter;

