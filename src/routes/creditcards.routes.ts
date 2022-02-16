import { Router } from "express";
import CreateCreditCardController from "../controllers/CreditCard/CreateCreditCardController";

const creditcardRouter = Router();

creditcardRouter.post('/', CreateCreditCardController.handle);

export default creditcardRouter;
