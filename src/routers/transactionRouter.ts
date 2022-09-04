import { Router } from "express";
import { rechargeCardValidation, paymentValidation } from "../middlewares/transactionMiddlewares.js";
import { rechargeCard, purchasePayment } from "../controllers/transactionsControllers.js";

const transactionRouter = Router();

transactionRouter.post("/recharge", rechargeCardValidation, rechargeCard);
transactionRouter.post("/payment", paymentValidation, purchasePayment);

export default transactionRouter;