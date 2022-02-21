import *as Yup from 'yup';
import { addMonths } from 'date-fns';

import Expense from "../models/Expense";
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

class UpdateExpenseService {
  private repository: ExpensesRepository;

  constructor(expensesRepository: ExpensesRepository) {
    this.repository = expensesRepository;
  }

  public async execute(id: string, {
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

    // Validação dos campos
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      value: Yup.number().required(),
      automaticDebit: Yup.boolean().required(),
      dueDate: Yup.date().required(),
      obs: Yup.string(),
      currentInstallment: Yup.number(),
      installments: Yup.number(),
      paid: Yup.boolean(),
      recurrent: Yup.boolean().required()
    });

    if (!(await schema.isValid({ description, value, automaticDebit, dueDate, obs, currentInstallment, installments, paid, recurrent }))) {
      throw Error('Validation Failed')
    }

    // Validar se o registro existe no banco findOneOrFail no repository
    const expenseToBeUpdated = await this.repository.findOneOrFail(id);

    // Checar duplicados mas não checar no registro em edição
    if (await this.repository.isDuplicatedButNotMe(id, description, value, dueDate)) {
      throw Error(`The expense ${description} with value ${value} on this date already exists`);
    }

    // verificar se tem installments, se tiver, deletar todos e recriar

    const expenses = [];

    if (installments > 1 || installments != expenseToBeUpdated.installments) {
      await this.repository.delete({
        description: expenseToBeUpdated.description,
        value: expenseToBeUpdated.value,
        installments: expenseToBeUpdated.installments
      });

      var monthsToAdd = 0;
      for (let i = currentInstallment; i <= installments; ++i) {
        let currentExpense = await this.repository.createExpense({
          description,
          value,
          automaticDebit,
          dueDate: addMonths(new Date(dueDate), monthsToAdd++),
          obs,
          currentInstallment: i,
          installments,
          paid,
          recurrent
        });

        paid = false;

        expenses.push(currentExpense);
      }
    } else {
      await this.repository.update(id, {
        description,
        value,
        automaticDebit,
        dueDate,
        obs,
        currentInstallment,
        installments,
        paid,
        recurrent
      });

      const updatedExpense = await this.repository.findOne(id);
      if (updatedExpense) {
        expenses.push(updatedExpense);
      }
    }

    return expenses;
  }
}


export default UpdateExpenseService;
