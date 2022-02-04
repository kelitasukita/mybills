import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import ExpenseRepository from '../repositories/ExpensesRepository';
import TogglePaidService from '../services/TogglePaidService';
import CreateExpenseController from '../controllers/Expenses/CreateExpenseController';
import DeleteExpenseController from '../controllers/Expenses/DeleteExpenseController';
import GetExpenseController from '../controllers/Expenses/GetExpenseController';
import EditExpenseController from '../controllers/Expenses/EditExpenseController';
import PaidExpensesController from '../controllers/Expenses/PaidExpensesController';
import UnpaidExpensesController from '../controllers/Expenses/UnpaidExpensesController';


const expensesRouter = Router();


expensesRouter.post('/', CreateExpenseController.handle);
expensesRouter.delete('/:id', DeleteExpenseController.handle);
expensesRouter.get('/unpaid', UnpaidExpensesController.handle);
expensesRouter.get('/paid', PaidExpensesController.handle);
expensesRouter.get('/:id', GetExpenseController.handle);
expensesRouter.put('/:id', EditExpenseController.handle);

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



export default expensesRouter;
