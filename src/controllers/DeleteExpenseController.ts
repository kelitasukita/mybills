import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Expense from "../models/Expense";

class DeleteExpenseController {

  async handle(request: Request, response: Response) {

    try {
      const expense = await getRepository(Expense).delete(request.params.id)

      return response.json({ message: 'Expense successfully deleted.'});

    } catch(error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new DeleteExpenseController();
