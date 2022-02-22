import { EntityRepository, Repository, Between, Not, LessThan } from 'typeorm';

import Expense from '../models/Expense';

interface ExpenseData {
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
class ExpenseRepository extends Repository<Expense> {
  public async createExpense(data: ExpenseData): Promise<Expense> {

    const expense = this.create(data);

    return await this.save(expense);
  }

  public async manualPayment(): Promise<Expense[] | undefined> {
    const expenses = await this.find({
      select: ["id", "description", "dueDate", "paid", "value"],
      where: { automaticDebit: false },
      order: {
        dueDate: "ASC"
      }
    });

    return expenses;
  }


  public async automaticPayments(): Promise<Expense[] | undefined> {
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
      select: ['id', 'description', 'paid', 'value', 'currentInstallment', 'installments'],
      order: {
        paid: 'DESC',
        dueDate: "ASC",
        value: "DESC"
      }
    });

    return allExpenses;
  }

  public async unpaid(from: Date, to: Date): Promise<Expense[] | undefined> {
    const allExpenses = await this.find({
      select: ['id', 'description', 'paid', 'value', 'dueDate', 'currentInstallment', 'installments'],
      where: [
        {
          paid: false,
          dueDate: Between(from, to)
        },
        {
          paid: false,
          dueDate: LessThan(to)
        },
      ],
      order: {
        dueDate: "ASC",
        value: "DESC"
      }
    });

    return allExpenses;
  }

  public async paid(from: Date, to: Date): Promise<Expense[] | undefined> {

    const allExpenses = await this.find({
      select: ['id', 'description', 'paid', 'value', 'dueDate', 'currentInstallment', 'installments'],
      where: {
        paid: true,
        dueDate: Between(from, to)
      },
      order: {
        dueDate: "ASC",
        value: "DESC"
      }
    });

    return allExpenses;
  }

  public async isDuplicated(description: string, value: number, dueDate: Date): Promise<Expense | undefined> {

    const expense = await this.findOne({
      where: {
        description,
        value,
        dueDate
      }
    });

    return expense;
  }

  public async isDuplicatedButNotMe(id: string, description: string, value: number, dueDate: Date): Promise<Expense | undefined> {

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
