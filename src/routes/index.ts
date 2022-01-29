import { Router } from 'express';

import expensesRouter from './expenses.routes';
import earningsRouter from './earnings.routes';

const routes = Router();

routes.use('/expenses', expensesRouter);
routes.use('/earnings', earningsRouter);

export default routes;
