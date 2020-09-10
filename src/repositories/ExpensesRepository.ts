import { EntityRepository, Repository, getRepository, Between } from 'typeorm';

import Expense from '../models/Expense';

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

@EntityRepository(Expense)
class ExpenseRepository extends Repository<Expense>   {
  public async createExpense({ description, value, automaticDebit, dueDate, obs, currentInstallment,  installments, paid, recurrent }: Request): Promise<Expense> {

    const expenseRepository = getRepository(Expense);

    const expense = await expenseRepository.create({
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

    return expenseRepository.save(expense);

  }


  public async manualPayment(): Promise<Expense[]|undefined> {
    const expenses = await this.find({
      select: ["description", "dueDate", "paid", "value"],
      where: { automaticDebit: false },
      order: {
        dueDate: "ASC"
      }
    });

    return expenses;
  }

  public async automaticPayments(): Promise<Expense[]|undefined> {
    const expenses = await this.find({
      select: ["description", "paid", "value"],
      where: { automaticDebit: true },
      order: {
        value: "DESC"
      }
    });

    return expenses;
  }

  public async allPayments(): Promise<Expense[] | undefined> {
    const allExpenses = await this.find({
      select: [ 'id','description', 'paid', 'value'],
      order: {
        paid: 'DESC'
      }
    });

    return allExpenses;
  }

  public async isDuplicated(description: string, value: number, dueDate:Date ): Promise<Expense | undefined> {

    const expense = await this.findOne({
      where: {
        description,
        value,
        dueDate
      }
    });

    return expense;
  }
}

export default ExpenseRepository;
