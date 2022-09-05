import { Request, Response } from "express";
import { generateCardInfo, activateCardPassword, block, unblock } from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {
    const { employeeId, cardType } = req.body;
    const apiKey = String(req.headers.x_api_key);
    const card = await generateCardInfo(apiKey, employeeId, cardType);
    res.status(201).send(card)
}

export async function activateCard(req: Request, res: Response) {
    const cardId = Number(req.params.cardId);
    const { CVC, password } = req.body;
    await activateCardPassword(cardId, CVC, password);
    res.sendStatus(202)
}

export async function blockCard(req: Request, res: Response) {
    const cardId = Number(req.params.cardId);
    const { password } = req.body;
    await block(cardId, password);
    res.sendStatus(202)
}
export async function unblockCard(req: Request, res: Response) {
    const cardId = Number(req.params.cardId);
    const { password } = req.body;
    await unblock(cardId, password);
    res.sendStatus(202)
}