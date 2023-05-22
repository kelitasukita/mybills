import { Router } from 'express';

import loginRouter from './login.routes';
import expensesRouter from './expenses.routes';
import earningsRouter from './earnings.routes';
import overviewRouter from './overview.routes';
import creditcardRouter from './creditcards.routes';

const routes = Router();
console.log('Rotas');
// login routes
routes.use('/login', loginRouter);

// middleware pra proteger as rotas abaixo

routes.use('/expenses', expensesRouter);
routes.use('/earnings', earningsRouter);
routes.use('/overview', overviewRouter);
routes.use('/creditcards', creditcardRouter);

export default routes;
