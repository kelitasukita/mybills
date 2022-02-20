import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Expense from "../../models/Expense";


class DeleteExpenseController {

  async handle(request: Request, response: Response) {
    const repository = getRepository(Expense);

    try {
      const { description, value, installments, created_at } = await repository.findOneOrFail(request.params.id);

      const deleted = await repository.delete({
        description,
        value,
        installments,
        // created_at / TODO: Resolving how to use date criteria
      });

      return response.json({ message: 'Expense successfully deleted.' });

    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new DeleteExpenseController();
