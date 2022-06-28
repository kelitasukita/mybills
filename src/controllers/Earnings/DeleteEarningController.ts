import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Earning from "../../models/Earning";

class DeleteEarningController {
  async handle(request: Request, response: Response) {
    const repository = getRepository(Earning);

    const { id } = request.params;

    try {
      await repository.delete({
        id
      })
      return response.json({ message: 'Earning successfully deleted.' })
    } catch (error: any) {
      return response.status(400).json({ error: error.message });

    }
  }
}

export default new DeleteEarningController();