import { Router } from "express";
import CreateEarningController from "../controllers/Earnings/CreateEarningController";
import ListEarningsController from "../controllers/Earnings/ListEarningsController";

const earningsRouter = Router();

// Criar receita
earningsRouter.get('/', ListEarningsController.handle);
earningsRouter.post('/', CreateEarningController.handle);

export default earningsRouter;

