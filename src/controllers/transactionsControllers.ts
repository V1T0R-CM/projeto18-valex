import { Request, Response } from "express";
import { generateReport, makeCardRecharge, purchase } from "../services/transactionService.js";

export async function rechargeCard(req: Request, res: Response) {
    const { cardId, amount } = req.body;
    await makeCardRecharge(cardId, amount);
    res.sendStatus(202)
}

export async function purchasePayment(req: Request, res: Response) {
    const { cardId, password, businessId, amount } = req.body;
    await purchase(cardId, password, businessId, amount);
    res.sendStatus(202)
}
export async function report(req: Request, res: Response) {
    const cardId = Number(req.params.cardId);
    const reportInfo = await generateReport(cardId)
    res.status(200).send(reportInfo)
}