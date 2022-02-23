import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import EarningsRepository from "../../repositories/EarningsRepository";

class ListEarningController {
  async handle(request: Request, response: Response) {
    const repository = getCustomRepository(EarningsRepository);
    const earnings = await repository.find();
    return response.json({
      data: earnings
    });
  }
}

export default new ListEarningController();
