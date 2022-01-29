import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import EarningsRepository from "../repositories/EarningsRepository";

class CreateEarningController {

  async handle(request: Request, response: Response) {
    const repository = getCustomRepository(EarningsRepository);

    return response.json(await repository.createEarning(request.body));
  }
}

export default new CreateEarningController();
