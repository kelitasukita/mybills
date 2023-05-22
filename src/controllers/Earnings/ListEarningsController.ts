import { Request, Response } from "express";
import { Between, getCustomRepository, TreeParent } from "typeorm";
import EarningsRepository from "../../repositories/EarningsRepository";

class ListEarningController {
  async handle(request: Request, response: Response) {

    const { year, month } = request.query;

    let today = new Date();
    let from = new Date();
    let to = new Date();

    if (today.getDate() > 24) {
      from = new Date(today.getFullYear(), today.getMonth(), 23); // mês atual
      to = new Date(today.getFullYear(), today.getMonth() + 1, 22); // mês seguinte
    } else {
      from = new Date(today.getFullYear(), today.getMonth() - 1, 23); // mês anterior
      to = new Date(today.getFullYear(), today.getMonth(), 22); // mês atual
    }

    if (year && month) {
      today = new Date(+year, +month - 1);

      from = new Date(today.getFullYear(), today.getMonth(), 23);
      to = new Date(today.getFullYear(), today.getMonth() + 1, 22);
    }

    const repository = getCustomRepository(EarningsRepository);
    const earnings = await repository.find({
      where: [
        {
          receiptDate: Between(from, to)
        }
      ],
      order: {
        receiptDate: "ASC",
        value: "DESC"
      }
    });

    let total: Number = 0 as Number;

    earnings.map(earning => {
      total = +total.toFixed(2) + Number(earning.value);
    })

    return response.json({
      data: earnings,
      total
    });
  }
}

export default new ListEarningController();
