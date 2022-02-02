import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import EarningsRepository from "../repositories/EarningsRepository";
import ExpenseRepository from "../repositories/ExpensesRepository";

class OverviewController {

  async overviewHandle(request: Request, response: Response)
  {
    const { year, month } = request.query;

    if (year && month) {
      const today = new Date(year, month - 1);
    } else {
      const today = new Date();
    }
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth()+1, 0);

    const earningsRepo = getCustomRepository(EarningsRepository);

    const { earnings } = await earningsRepo.createQueryBuilder('earnings')
      .select('SUM(value)', 'earnings')
      .where('"receiptDate" BETWEEN :firstDay AND :endDate', {endDate, firstDay})
      .getRawOne();

    const expensesRepo = getCustomRepository(ExpenseRepository);
    const { expenses } = await expensesRepo.createQueryBuilder('expenses')
      .select('SUM(value)', 'expenses')
      .where('"dueDate" BETWEEN :firstDay AND :endDate', {endDate, firstDay})
      .getRawOne();

      return response.json({ earnings, expenses, balance: earnings - expenses });
  }
}

export default new OverviewController();
