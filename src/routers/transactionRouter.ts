import { Router } from "express";
import { rechargeCardValidation, paymentValidation, reportValidation } from "../middlewares/transactionMiddlewares.js";
import { rechargeCard, purchasePayment, report } from "../controllers/transactionsControllers.js";

const transactionRouter = Router();

transactionRouter.post("/transactions/recharge", rechargeCardValidation, rechargeCard);
transactionRouter.post("/transactions/payment", paymentValidation, purchasePayment);
transactionRouter.get("/transactions/report/:cardId", reportValidation, report)

export default transactionRouter;