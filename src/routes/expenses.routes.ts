import { Router } from 'express';
import * as Yup from 'yup';
import { uuid } from 'uuidv4';

const expensesRouter = Router();
const expenses = [];

expensesRouter.post('/', async (request, response) => {
  const {
    description,
    value,
    automaticDebit,
    dueDate,
    obs,
    installments,
    paid,
    recurrent,
  } = request.body;

  const schema = Yup.object().shape({
    description: Yup.string().required(),
    value: Yup.number().required(),
    automaticDebit: Yup.boolean().required(),
    recurrent: Yup.boolean().required(),
  });

  if (!(await schema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation failed!' });
  }

  // @todo validar pra não repetir

  const expense = {
    id: uuid(),
    description,
    value,
    automaticDebit,
    dueDate,
    obs,
    installments,
    paid,
    recurrent,
  };

  expenses.push(expense);

  return response.json(expense);
});

export default expensesRouter;
