import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ExpenseRepository from "../../repositories/ExpensesRepository";
import ExpenseInstallmentsService from "../../services/ExpenseInstallmentsService";

interface CreateExpenseRequest {
  description: string;
  value: number;
  automaticDebit: boolean;
  dueDate: Date;
  obs: string;
  currentInstallment: bigint;
  installments: bigint;
  paid: boolean;
  recurrent: boolean;
}

class CreateExpenseController {

  async handle(request: Request, response: Response) {
    try {
      const data: CreateExpenseRequest = request.body;

      const repository = getCustomRepository(ExpenseRepository);
      const expenses = await repository.createExpense(data);

      return response.json(expenses);

    } catch(error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export default new CreateExpenseController();
