import { Router } from 'express';

import expensesRouter from './expenses.routes';

const routes = Router();

routes.use('/expenses', expensesRouter);

export default routes;
