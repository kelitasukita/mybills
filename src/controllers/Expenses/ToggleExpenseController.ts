import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ExpenseRepository from "../../repositories/ExpensesRepository";
import TogglePaidService from "../../services/TogglePaidService";

class ToggleExpenseController {
  async handle(request: Request, response: Response) {
    const id = request.params.id;

    const repository = getCustomRepository(ExpenseRepository);

    const service = new TogglePaidService(repository);

    try {
      const executionResponse = await service.execute(id);
      return response.json(executionResponse);
    } catch(error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new ToggleExpenseController();
