import { getRepository } from 'typeorm';

import Expense from "../models/Expenses";

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
  public async execute({ description, value, automaticDebit, dueDate, obs, currentInstallment, installments, paid, recurrent }: Request): Promise<Expense> {
    const expensesRepository = getRepository(Expense);

    const expense = expensesRepository.create({
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

    await expensesRepository.save(expense);

    return expense;
  }
}

export default CreateExpenseService;
