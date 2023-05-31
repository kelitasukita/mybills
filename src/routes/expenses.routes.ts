import { Request, Response, Router } from "express";

import CreateExpenseController from "../controllers/Expenses/CreateExpenseController";
import DeleteExpenseController from "../controllers/Expenses/DeleteExpenseController";
import GetExpenseController from "../controllers/Expenses/GetExpenseController";
import EditExpenseController from "../controllers/Expenses/EditExpenseController";
import PaidExpensesController from "../controllers/Expenses/PaidExpensesController";
import UnpaidExpensesController from "../controllers/Expenses/UnpaidExpensesController";
import ToggleExpenseController from "../controllers/Expenses/ToggleExpenseController";
import { getCustomRepository } from "typeorm";
import ExpenseRepository from "../repositories/ExpensesRepository";
import axios from "axios";
import GetAllExpensesController from "../controllers/Expenses/GetAllExpensesController";

const expensesRouter = Router();

expensesRouter.post("/", CreateExpenseController.handle);
expensesRouter.delete("/:id", DeleteExpenseController.handle);

expensesRouter.get(
  "/unpaid",
  async (req: Request, res: Response, next) => {
    const { year, month } = req.query;

    const expenseRepository = getCustomRepository(ExpenseRepository);
    await expenseRepository.generateMissingRecurrent(year, month);

    next();
  },
  UnpaidExpensesController.handle
);

expensesRouter.get("/paid", PaidExpensesController.handle);
expensesRouter.get("/:id", GetExpenseController.handle);
expensesRouter.get("/", GetAllExpensesController.handle);
expensesRouter.put("/:id", EditExpenseController.handle);
expensesRouter.patch("/:id/toggle", ToggleExpenseController.handle);

expensesRouter.get("/test/wise", async (req, res) => {
  const response = await axios.post(`https://api.transferwise.com/v3/quotes/`, {
    targetAmount: req.query.valor,
    sourceCurrency: "EUR",
    targetCurrency: "BRL",
    preferredPayIn: "BANK_TRANSFER",
  });

  const inEuro = response.data.paymentOptions[0].sourceAmount;

  return res.json({
    brl: +req.query.valor,
    eur: inEuro,
  });
});

export default expensesRouter;
