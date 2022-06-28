import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import EarningsRepository from "../../repositories/EarningsRepository";

class EditEarningController {
  async handle(request: Request, response: Response) {
    const {
      description,
      value,
      receiptDate
    } = request.body;

    const id = request.params.id;

    try {

      const repository = getCustomRepository(EarningsRepository);
      const updated = await repository.update(id, request.body);

      return response.json(updated);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }


  }
}

export default new EditEarningController();