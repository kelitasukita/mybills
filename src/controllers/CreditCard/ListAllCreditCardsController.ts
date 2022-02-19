import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import CreditCardRepository from "../../repositories/CreditCardRepository";

class ListAllCreditCardsController {
  async handle(request: Request, response: Response) {

    const creditcardRepository = getCustomRepository(CreditCardRepository);

    try {

      const creditcards = await creditcardRepository.find();
      return response.json(creditcards);
    } catch {
      return response.status(404).json({ message: 'Credit Cards not found' });
    }
  }
}

export default new ListAllCreditCardsController();