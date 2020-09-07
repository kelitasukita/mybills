import { EntityRepository, Repository } from 'typeorm';

import Expense from '../models/Expense';

@EntityRepository(Expense)
class ExpenseRepository extends Repository<Expense>   {
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
}

export default ExpenseRepository;
