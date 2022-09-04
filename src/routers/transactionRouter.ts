import { Router } from "express";
import { rechargeCardValidation, paymentValidation, reportValidation } from "../middlewares/transactionMiddlewares.js";
import { rechargeCard, purchasePayment, report } from "../controllers/transactionsControllers.js";

const transactionRouter = Router();

transactionRouter.post("/recharge", rechargeCardValidation, rechargeCard);
transactionRouter.post("/payment", paymentValidation, purchasePayment);
transactionRouter.get("/report/:cardId", reportValidation, report)

export default transactionRouter;