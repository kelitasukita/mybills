import { Router } from 'express';

import expensesRouter from './expenses.routes';
import earningsRouter from './earnings.routes';
import overviewRouter from './overview.routes';

const routes = Router();

routes.use('/expenses', expensesRouter);
routes.use('/earnings', earningsRouter);
routes.use('/overview', overviewRouter);

export default routes;
