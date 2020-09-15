import { Router, request, response } from 'express';

import CreateExpenseService from '../services/CreateExpenseService';
import Expense from '../models/Expense';
import { getRepository, getCustomRepository } from 'typeorm';
import ExpenseRepository from '../repositories/ExpensesRepository';
import UpdateExpenseService from '../services/UpdateExpenseService';
import { lightFormat } from 'date-fns';

const expensesRouter = Router();

expensesRouter.post('/', async (request, response) => {
  try {
    const { description, value, automaticDebit, dueDate, obs, currentInstallment, installments, paid, recurrent } = request.body;
    const repository = getCustomRepository(ExpenseRepository);
    const createExpense = new CreateExpenseService(repository);

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
  const expenseRepository = getCustomRepository(ExpenseRepository);

  return response.json({
    overview: {},
    manualPayments: await expenseRepository.manualPayment(),
    automaticPayments: await expenseRepository.automaticPayments(),
    allPayments: await expenseRepository.allPayments()
  });
});

// Rota para buscar dados para poder apresentar no formulário para edição
expensesRouter.get('/:id', async (request, response) => {
  const expenseRepository = getCustomRepository(ExpenseRepository);
  try {
    const expense = await expenseRepository.findOneOrFail(request.params.id);
    return response.json(expense);
  } catch {
    return response.status(404).json({message: 'Expense not found!'});
  }
});


expensesRouter.delete('/:id', async (request, response) => {
  const expensesDelete = await getRepository(Expense).delete(request.params.id)

  return response.json({ message: 'Expense successfully deleted!'});
});

// GET /expenses/34124532 - Só pra pegar os dados dessa expense pra colocar no formulário
// PUT /expenses/34124532 - Atualiza os dados de fato
expensesRouter.put('/:id', async (request, response) => {

  const {
    description,
    value,
    automaticDebit,
    dueDate,
    obs,
    currentInstallment,
    installments,
    paid,
    recurrent
  } = request.body;

  const id = request.params.id;

  const repository = getCustomRepository(ExpenseRepository);

  const service = new UpdateExpenseService(repository);

  const dadosParaEdicao = {
    description,
    value,
    automaticDebit,
    dueDate,
    obs,
    currentInstallment,
    installments,
    paid,
    recurrent
  };

  const executionResponse = service.execute(id, dadosParaEdicao);

  return response.json(executionResponse);
});


export default expensesRouter;
