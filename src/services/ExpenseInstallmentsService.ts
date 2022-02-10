import { addMonths } from "date-fns";
import Expense from "../models/Expense";
import ExpensesRepository from "../repositories/ExpensesRepository";

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

class ExpenseInstallmentsService {
  private repository: ExpensesRepository;

  constructor(expensesRepository: ExpensesRepository) {
    this.repository = expensesRepository;
  }

  public async execute(data: Request, id?: string) {
    const { description, value, automaticDebit, dueDate, obs, currentInstallment,  installments, paid, recurrent } = data;

    const expenses: Expense[] = [];

    await this.delete(description, value, installments);

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

      expenses.push(currentExpense);
    }

    return expenses;
  }

  private delete(description: string, value: number, installments: bigint) {
    return this.repository.delete({
      description,
      value,
      installments
    });
  }

}

export default ExpenseInstallmentsService;
