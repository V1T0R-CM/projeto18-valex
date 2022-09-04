import { Router } from "express";
import { rechargeCardValidation } from "../middlewares/transactionMiddlewares.js";
import { rechargeCard } from "../controllers/transactionsControllers.js";

const transactionRouter = Router();

transactionRouter.post("/recharge", rechargeCardValidation, rechargeCard);
//transactionRouter.post("/payment", paymentCardValidation, paymentCard);

export default transactionRouter;