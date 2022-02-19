import { addMonths } from 'date-fns';
import * as Yup from 'yup';

import Expense from '../models/Expense';
import ExpensesRepository from '../repositories/ExpensesRepository';

interface Request {
  description: string;
  value: number;
  automaticDebit: boolean;
  dueDate: Date;
  obs: string;
  currentInstallment: bigint;
  installments: bigint;
  paid: boolean;
  recurrent: boolean;
}

class CreateExpenseService {
  private expensesRepository: ExpensesRepository;

  constructor(repository: ExpensesRepository) {
    this.expensesRepository = repository;
  }

  public async execute({
    description,
    value,
    automaticDebit,
    dueDate,
    obs,
    currentInstallment,
    installments,
    paid,
    recurrent,
  }: Request): Promise<Expense[] | null> {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      value: Yup.number().required(),
      automaticDebit: Yup.boolean().required(),
      dueDate: Yup.date().required(),
      obs: Yup.string(),
      currentInstallment: Yup.number().integer(),
      installments: Yup.number().integer(),
      paid: Yup.boolean(),
      recurrent: Yup.boolean().required(),
    });

    if (
      !(await schema.isValid({
        description,
        value,
        automaticDebit,
        dueDate,
        obs,
        currentInstallment,
        installments,
        paid,
        recurrent,
      }))
    ) {
      throw Error('Validation Failed');
    }

    if (await this.expensesRepository.isDuplicated(description, value, dueDate)) {
      throw Error(`The expense ${description} with value ${value} on this date already exists`);
    }

    const expenses = [];

    if (installments > 1) {
      let monthsToAdd = 0;
      for (let i = currentInstallment; i <= installments; ++i) {
        const currentExpense = await this.expensesRepository.createExpense({
          description,
          value,
          automaticDebit,
          dueDate: addMonths(new Date(dueDate), monthsToAdd++),
          obs,
          currentInstallment: i,
          installments,
          paid,
          recurrent,
        });

        paid = false;

        expenses.push(currentExpense);
      }
    } else {
      const expense = await this.expensesRepository.createExpense({
        description,
        value,
        automaticDebit,
        dueDate,
        obs,
        currentInstallment,
        installments,
        paid,
        recurrent,
      });

      expenses.push(expense);
    }

    return expenses;
  }
}

export default CreateExpenseService;
