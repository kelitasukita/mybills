import { Router, request, response } from 'express';

import CreateExpenseService from '../services/CreateExpenseService';
import Expense from '../models/Expense';
import { getRepository, getCustomRepository } from 'typeorm';
import ExpenseRepository from '../repositories/ExpensesRepository';
import UpdateExpenseService from '../services/UpdateExpenseService';
import TogglePaidService from '../services/TogglePaidService';

const expensesRouter = Router();

// Criar despesa
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
    });
     return response.json(expense);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// Listar todas as despesas, ganhos e saldo
expensesRouter.get('/', async (request, response) => {
  const expenseRepository = getCustomRepository(ExpenseRepository);

  return response.json({
    overview: {},
    manualPayments: await expenseRepository.manualPayment(),
    automaticPayments: await expenseRepository.automaticPayments(),
    allPayments: await expenseRepository.allPayments()
  });
});

expensesRouter.get('/unpaid', async (request, response) => {
  const expenseRepository = getCustomRepository(ExpenseRepository);

  return response.json({
    data:  await expenseRepository.unpaid()
  });
});

expensesRouter.get('/paid', async (request, response) => {
  const expenseRepository = getCustomRepository(ExpenseRepository);

  return response.json({
    data:  await expenseRepository.paid()
  });
});

// Listar itens para edição
expensesRouter.get('/:id', async (request, response) => {
  const expenseRepository = getCustomRepository(ExpenseRepository);
  try {
    const expense = await expenseRepository.findOneOrFail(request.params.id);
    return response.json(expense);
  } catch {
    return response.status(404).json({message: 'Expense not found!'});
  }
});

// Deletar uma despesa
expensesRouter.delete('/:id', async (request, response) => {
  try {
    const expensesDelete = await getRepository(Expense).delete(request.params.id)

    return response.json({ message: 'Expense successfully deleted.'});
  } catch {
    return response.status(400).json({ message: 'Fail to delete expense.'});
  }
});

// Marcar como paga ou não paga
expensesRouter.patch('/:id/toggle', async (request, response) => {
  const id = request.params.id;

  const repository = getCustomRepository(ExpenseRepository);

  const service = new TogglePaidService(repository);

  try {
    const executionResponse = await service.execute(id);
    return response.json(executionResponse);
  } catch(e) {
    return response.status(400).json({ message: e.message });
  }
});

// Editar uma despesa
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
  try {
    const executionResponse = await service.execute(id, dadosParaEdicao);
    return response.json(executionResponse);
  } catch(e) {
    return response.status(400).json({ message: e.message });
  }

});


export default expensesRouter;
