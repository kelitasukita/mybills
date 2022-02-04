import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ExpenseRepository from "../../repositories/ExpensesRepository";

class PaidExpensesController {
  async handle(request: Request, response: Response) {

    const expenseRepository = getCustomRepository(ExpenseRepository);

    return response.json({
      data:  await expenseRepository.paid()
    });
  }
}

export default new PaidExpensesController();
