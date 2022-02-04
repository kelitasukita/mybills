import { Router } from 'express';

import Expense from '../models/Expense';
import { getRepository, getCustomRepository } from 'typeorm';
import ExpenseRepository from '../repositories/ExpensesRepository';
import UpdateExpenseService from '../services/UpdateExpenseService';
import TogglePaidService from '../services/TogglePaidService';
import CreateExpenseController from '../controllers/Expenses/CreateExpenseController';
import DeleteExpenseController from '../controllers/Expenses/DeleteExpenseController';
import GetExpenseController from '../controllers/Expenses/GetExpenseController';


const expensesRouter = Router();


expensesRouter.post('/', CreateExpenseController.handle);
expensesRouter.delete('/:id', DeleteExpenseController.handle);
expensesRouter.get('/:id', GetExpenseController.handle);

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


// Marcar como paga ou não paga
expensesRouter.patch('/:id/toggle', async (request, response) => {
  const id = request.params.id;

  const repository = getCustomRepository(ExpenseRepository);

  const service = new TogglePaidService(repository);

  try {
    const executionResponse = await service.execute(id);
    return response.json(executionResponse);
  } catch(error: any) {
    return response.status(400).json({ error: error.message });
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
  } catch(error: any) {
    return response.status(400).json({ error: error.message });
  }

});


export default expensesRouter;
