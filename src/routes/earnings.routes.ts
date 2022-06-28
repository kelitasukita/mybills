import { Router } from "express";
import CreateEarningController from "../controllers/Earnings/CreateEarningController";
import DeleteEarningController from "../controllers/Earnings/DeleteEarningController";
import EditEarningController from "../controllers/Earnings/EditEarningController";
import ListEarningsController from "../controllers/Earnings/ListEarningsController";

const earningsRouter = Router();

// Criar receita
earningsRouter.get('/', ListEarningsController.handle);
earningsRouter.post('/', CreateEarningController.handle);
earningsRouter.put('/:id', EditEarningController.handle);
earningsRouter.delete('/:id', DeleteEarningController.handle);

export default earningsRouter;

