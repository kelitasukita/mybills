import { Router } from 'express';
import expensesRoutes from './expenses.routes';

const routes = Router();

routes.use('/expenses', expensesRoutes);

export default routes;
