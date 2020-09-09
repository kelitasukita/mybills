import *as Yup from 'yup';

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


class CreateExpenseService {
  private expensesRepository: ExpensesRepository;

  constructor(expensesRepository: ExpensesRepository) {
    this.expensesRepository = expensesRepository;
  }

  public async execute({ description, value, automaticDebit, dueDate, obs, currentInstallment,  installments, paid, recurrent }: Request): Promise<Expense[] | null> {

    // [x] Validar dados
    // [ ] Checar se a despesa não possui parcelas
    // [ ] Se possuir parcelas fazer o loop para cadastrar cada parcela

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

    if(!(await schema.isValid({ description, value, automaticDebit, dueDate, obs, currentInstallment,  installments, paid, recurrent }))) {
      throw Error('Validation Failed')
    }

    const expenses = [];

    if(installments > 1) {

      for (let i = currentInstallment; i <= installments; ++i) {
        let currentExpense = await this.expensesRepository.createExpense({
          description,
          value,
          automaticDebit,
          dueDate, // subir os meses/ano também
          obs,
          currentInstallment: i,
          installments,
          paid,
          recurrent
        });

        expenses.push(currentExpense);
      }
    } else {
      const expense = await this.expensesRepository.create({
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

      expenses.push(expense);
    }


    return expenses;
  }
}

export default CreateExpenseService;
