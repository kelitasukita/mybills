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
  const expensesList = await getRepository(Expense).find()

  return response.json(expensesList);
});

expensesRouter.delete('/:id', async (request, response) => {
  const expensesDelete = await getRepository(Expense).delete(request.params.id)

  return response.json({ message: 'Expense successfully deleted!'});
});

expensesRouter.put('/:id', async (request, response) => {
  const expense = await getRepository(Expense).findOne(request.params.id);

  if (!expense) {
    return response.json({ error: 'Expense does not exist!'})
  }

  getRepository(Expense).merge(expense, request.body);

  const expenseUpdated = await getRepository(Expense).save(expense);

  return response.json(expenseUpdated);
});

export default expensesRouter;
