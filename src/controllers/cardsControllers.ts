import { Request, Response } from "express";
import { generateCardInfo, activateCardPassword } from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {
    const { employeeId, cardType } = req.body;
    const apiKey = String(req.headers.x_api_key);
    await generateCardInfo(apiKey, employeeId, cardType);
    res.sendStatus(201)
}

export async function activateCard(req: Request, res: Response) {
    const { cardId, CVC, password } = req.body;
    await activateCardPassword(cardId, CVC, password);
    res.sendStatus(202)
}