import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ExpenseRepository from "../repositories/ExpensesRepository";

class CreateExpenseController {

  async handle(request: Request, response: Response) {

    try {

      const repository = getCustomRepository(ExpenseRepository);

      return response.json(await repository.createExpense(request.body));

    } catch(error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export default new CreateExpenseController();
