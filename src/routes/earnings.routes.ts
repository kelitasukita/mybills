import { Router } from "express";
import CreateEarningController from "../controllers/CreateEarningController";

const earningsRouter = Router();

// Criar receita
earningsRouter.post('/', CreateEarningController.handle);

export default earningsRouter;

