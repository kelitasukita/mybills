import { EntityRepository, Repository, getRepository, Between, Not, LessThan } from 'typeorm';

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
      select: ["id", "description", "dueDate", "paid", "value"],
      where: { automaticDebit: false },
      order: {
        dueDate: "ASC"
      }
    });

    return expenses;
  }


  public async automaticPayments(): Promise<Expense[]|undefined> {
    const expenses = await this.find({
      select: ["id", "description", "paid", "value", "dueDate"],
      where: { automaticDebit: true },
      order: {
        dueDate: "ASC",
        value: "DESC"
      }
    });

    return expenses;
  }


  public async allPayments(): Promise<Expense[] | undefined> {
    const allExpenses = await this.find({
      select: [ 'id','description', 'paid', 'value', 'currentInstallment', 'installments'],
      order: {
        paid: 'DESC',
        dueDate: "ASC",
        value: "DESC"
      }
    });

    return allExpenses;
  }

  public async unpaid(): Promise<Expense[] | undefined> {

    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);

    const allExpenses = await this.find({
      select: [ 'id','description', 'paid', 'value', 'dueDate', 'currentInstallment', 'installments'],
      where: {
        paid: false,
        dueDate: LessThan(lastDayOfMonth)
      },
      order: {
        dueDate: "ASC",
        value: "DESC"
      }
    });

    return allExpenses;
  }

  public async paid(): Promise<Expense[] | undefined> {

    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);

    const allExpenses = await this.find({
      select: [ 'id','description', 'paid', 'value', 'dueDate', 'currentInstallment', 'installments'],
      where: {
        paid: true,
        dueDate: LessThan(lastDayOfMonth)
      },
      order: {
        dueDate: "ASC",
        value: "DESC"
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

  public async isDuplicatedButNotMe(id:string, description: string, value: number, dueDate:Date ): Promise<Expense | undefined> {

    const expense = await this.findOne({
      where: {
        id: Not(id),
        description,
        value,
        dueDate
      }
    });

    return expense;
  }
}


export default ExpenseRepository;
