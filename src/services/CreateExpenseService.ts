import { getRepository } from 'typeorm';

import Expense from "../models/Expense";

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
  public async execute({ description, value, automaticDebit, dueDate, obs, currentInstallment,  installments, paid, recurrent }: Request): Promise<Expense> {

    // Validar dados
    // Checar se a despesa não possui parcelas
    // Se possuir parcelas fazer o loop para cadastrar cada parcela

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
