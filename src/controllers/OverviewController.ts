import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import EarningsRepository from "../repositories/EarningsRepository";
import ExpenseRepository from "../repositories/ExpensesRepository";

class OverviewController {

  async overviewHandle(request: Request, response: Response)
  {
    const {  year,  month } = request.query;

    let today = new Date();
    let firstDay = new Date();
    let endDate = new Date();

    if (today.getDate() > 24) {
      firstDay = new Date(today.getFullYear(), today.getMonth(), 24); // mês atual
      endDate = new Date(today.getFullYear(), today.getMonth()+1, 23); // mês seguinte
    } else {
      firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 24); // mês anterior
      endDate = new Date(today.getFullYear(), today.getMonth(), 23); // mês atual
    }

    if (year && month) {
      today = new Date(+year, +month - 1);

      firstDay = new Date(today.getFullYear(), today.getMonth(), 24);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 23);
    }

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

      return response.json({
        earnings,
        expenses,
        balance: earnings - expenses,
        from: firstDay,
        to: endDate
      });
  }
}

export default new OverviewController();
