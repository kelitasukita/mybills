import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ExpenseRepository from "../../repositories/ExpensesRepository";

class GetAllExpenseController {
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

    try {
      const expense = await expenseRepository.allExpenses(from, to);
      return response.json(expense);
      console.log(expense);
    } catch {
      return response.status(404).json({ message: "No expenses found!" });
    }
  }
}

export default new GetAllExpenseController();
