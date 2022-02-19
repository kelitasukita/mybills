import { Request, Response } from "express";
import { getRepository } from "typeorm";
import CreditCard from "../../models/CreditCard";

class DeleteCreditCardController {

  async handle(request: Request, response: Response) {

    try {
      const creditcard = await getRepository(CreditCard).delete(request.params.id)

      return response.json({ message: 'Credit Card deleted successfully!' });

    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new DeleteCreditCardController();