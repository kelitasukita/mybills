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

  public async allPayments(): Promise<Expense[] | undefined> {
    const allExpenses = await this.find({
      select: [ 'id','description', 'paid', 'value'],
      order: {
        paid: 'DESC'
      }
    });

    return allExpenses;
  }
}

export default ExpenseRepository;
