import axios from "axios";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ExpenseRepository from "../../repositories/ExpensesRepository";

class UnpaidExpensesController {
  async handle(request: Request, response: Response) {

    const { year, month } = request.query;

    let today = new Date();
    let from = new Date();
    let to = new Date();

    if (today.getDate() > 24) {
      from = new Date(today.getFullYear(), today.getMonth(), 23); // mês atual
      to = new Date(today.getFullYear(), today.getMonth() + 1, 22); // mês seguinte
    } else {
      from = new Date(today.getFullYear(), today.getMonth() - 1, 23); // mês anterior
      to = new Date(today.getFullYear(), today.getMonth(), 22); // mês atual
    }

    if (year && month) {
      today = new Date(+year, +month - 1);

      from = new Date(today.getFullYear(), today.getMonth(), 23);
      to = new Date(today.getFullYear(), today.getMonth() + 1, 22);
    }

    const expenseRepository = getCustomRepository(ExpenseRepository);
    const expenses = await expenseRepository.unpaid(from, to);

    let total: Number = 0 as Number;
    let totalMonth: Number = 0 as Number;
    let totalOverdue: Number = 0 as Number;

    if (expenses) {
      await Promise.all(expenses.map(async expense => {
        expense.overdue = new Date(expense.dueDate) < from;
        
        if (expense.currency !== "EUR") { 
          try {

            const response = await axios.post(`https://api.transferwise.com/v3/quotes/`, {
              "targetAmount": expense.value,
              "sourceCurrency": "EUR", // @todo Mudar isso para o currency padrão do usuário
              "targetCurrency": expense.currency,
              "preferredPayIn":"BANK_TRANSFER"
            });

            expense.exchangedValue = response.data.paymentOptions[0].sourceAmount;
          } catch(e) {
            console.log('Falhou transfer wise no unpaid! =[');
          }
        }

        if (expense.overdue) {
          totalOverdue = +totalOverdue + Number(expense.exchangedValue || expense.value);
        } else {
          totalMonth = +totalMonth + Number(expense.exchangedValue || expense.value);
        }
        total = +total + Number(expense.exchangedValue || expense.value);

      }));

      total = +total.toFixed(2);
      totalMonth = +totalMonth.toFixed(2);
      totalOverdue = +totalOverdue.toFixed(2);
    }

    return response.json({
      data: expenses,
      total,
      totalOverdue,
      totalMonth
    });
  }
}

export default new UnpaidExpensesController();
