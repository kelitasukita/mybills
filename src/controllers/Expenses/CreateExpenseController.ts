import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ExpenseRepository from "../../repositories/ExpensesRepository";
import CreateExpenseService from "../../services/CreateExpenseService";

class CreateExpenseController {

  async handle(request: Request, response: Response) {

    try {

      const repository = getCustomRepository(ExpenseRepository);
      const service = new CreateExpenseService(repository);

      return response.json(await service.execute(request.body));

    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export default new CreateExpenseController();
