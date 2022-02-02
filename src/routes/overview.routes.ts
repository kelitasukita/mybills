import { Router } from "express";
import OverviewController from "../controllers/OverviewController";

const overviewRouter = Router();

overviewRouter.get('/', OverviewController.overviewHandle);

export default overviewRouter;
