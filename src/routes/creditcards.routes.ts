import { Router } from "express";
import CreateCreditCardController from "../controllers/CreditCard/CreateCreditCardController";
import DeleteCreditCardController from "../controllers/CreditCard/DeleteCreditCardController";
import ListAllCreditCardsController from "../controllers/CreditCard/ListAllCreditCardsController";

const creditcardRouter = Router();

creditcardRouter.post('/', CreateCreditCardController.handle);
creditcardRouter.delete('/:id', DeleteCreditCardController.handle);
creditcardRouter.get('/', ListAllCreditCardsController.handle);

export default creditcardRouter;
