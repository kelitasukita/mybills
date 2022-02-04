import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ExpenseRepository from "../../repositories/ExpensesRepository";

class UnpaidExpensesController {
  async handle(request: Request, response: Response) {

    const expenseRepository = getCustomRepository(ExpenseRepository);

    return response.json({
      data:  await expenseRepository.unpaid()
    });
  }
}

export default new UnpaidExpensesController();
