import { Router } from 'express';

import CreateExpenseController from '../controllers/Expenses/CreateExpenseController';
import DeleteExpenseController from '../controllers/Expenses/DeleteExpenseController';
import GetExpenseController from '../controllers/Expenses/GetExpenseController';
import EditExpenseController from '../controllers/Expenses/EditExpenseController';
import PaidExpensesController from '../controllers/Expenses/PaidExpensesController';
import UnpaidExpensesController from '../controllers/Expenses/UnpaidExpensesController';
import ToggleExpenseController from '../controllers/Expenses/ToggleExpenseController';


const expensesRouter = Router();


expensesRouter.post('/', CreateExpenseController.handle);
expensesRouter.delete('/:id', DeleteExpenseController.handle);
expensesRouter.get('/unpaid', UnpaidExpensesController.handle);
expensesRouter.get('/paid', PaidExpensesController.handle);
expensesRouter.get('/:id', GetExpenseController.handle);
expensesRouter.put('/:id', EditExpenseController.handle);
expensesRouter.patch('/:id/toggle', ToggleExpenseController.handle);

export default expensesRouter;
