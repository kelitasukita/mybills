import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import CreditCardRepository from "../../repositories/CreditCardRepository";
import CreateCreditCardService from "../../services/CreateCreditCardService";

class CreateCreditCardController {
  async handle(request: Request, response: Response) {

    try {

      const repository = getCustomRepository(CreditCardRepository);
      const service = new CreateCreditCardService(repository);

      return response.json(await service.execute(request.body));

    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new CreateCreditCardController();
