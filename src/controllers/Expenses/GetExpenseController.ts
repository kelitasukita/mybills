import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ExpenseRepository from "../../repositories/ExpensesRepository";

class GetExpenseController {
  async handle(request: Request, response: Response){

    const expenseRepository = getCustomRepository(ExpenseRepository);

    try {

      const expense = await expenseRepository.findOneOrFail(request.params.id);
      return response.json(expense);

    } catch {
      return response.status(404).json({message: 'Expense not found!'});
    }
  }
}

export default new GetExpenseController();
