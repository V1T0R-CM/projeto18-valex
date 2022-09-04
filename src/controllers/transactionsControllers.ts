import { Request, Response } from "express";
import { makeCardRecharge } from "../services/transactionService.js";

export async function rechargeCard(req: Request, res: Response) {
    const { cardId, amount } = req.body;
    await makeCardRecharge(cardId, amount);
    res.sendStatus(201)
}