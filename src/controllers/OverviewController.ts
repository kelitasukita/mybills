import axios from "axios";
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
      firstDay = new Date(today.getFullYear(), today.getMonth(), 23); // mês atual
      endDate = new Date(today.getFullYear(), today.getMonth()+1, 22); // mês seguinte
    } else {
      firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 23); // mês anterior
      endDate = new Date(today.getFullYear(), today.getMonth(), 22); // mês atual
    }

    if (year && month) {
      today = new Date(+year, +month - 1);

      firstDay = new Date(today.getFullYear(), today.getMonth(), 23);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 22);
    }

    const earningsRepo = getCustomRepository(EarningsRepository);

    const { earnings } = await earningsRepo.createQueryBuilder('earnings')
      .select('SUM(value)', 'earnings')
      .where('"receiptDate" BETWEEN :firstDay AND :endDate', {endDate, firstDay})
      .getRawOne();

    const expensesRepo = getCustomRepository(ExpenseRepository);
    const expensesByCurrency = await expensesRepo.createQueryBuilder('expenses')
      .select('currency')
      .addSelect('SUM(value)', 'expenses')
      .where('"dueDate" BETWEEN :firstDay AND :endDate', {endDate, firstDay})
      .groupBy('currency')
      .getRawMany();
    
    let expenses = 0;

    await Promise.all(expensesByCurrency.map(async totalByCurrency => {
      let finalValue = +totalByCurrency.expenses;
      if (totalByCurrency.currency !== 'EUR') {
        try {

          const response = await axios.post(`https://api.transferwise.com/v3/quotes/`, {
            "targetAmount": finalValue,
            "sourceCurrency": "EUR", // @todo Mudar isso para o currency padrão do usuário
            "targetCurrency": totalByCurrency.currency,
            "preferredPayIn":"BANK_TRANSFER"
          });
          
          finalValue = +response.data.paymentOptions[0].sourceAmount;
        } catch (e) {
          console.log('Transferwise falhou =[');
        }
      }

      expenses += finalValue;
    }));

    return response.json({
      earnings: (+earnings).toFixed(2),
      expenses: (+expenses).toFixed(2),
      balance: (earnings - expenses).toFixed(2),
      from: firstDay,
      to: endDate
    });
  }
}

export default new OverviewController();
