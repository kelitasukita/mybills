import { Router } from "express";
import CreateCreditCardController from "../controllers/CreditCard/CreateCreditCardController";
import DeleteCreditCardController from "../controllers/CreditCard/DeleteCreditCardController";

const creditcardRouter = Router();

creditcardRouter.post('/', CreateCreditCardController.handle);
creditcardRouter.delete('/:id', DeleteCreditCardController.handle);

export default creditcardRouter;
