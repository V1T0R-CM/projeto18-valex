import { Request, Response } from "express";
import { generateCardInfo } from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {
    const { employeeId, cardType } = req.body;
    const apiKey = String(req.headers.x_api_key);
    try {
        await generateCardInfo(apiKey, employeeId, cardType);
        res.sendStatus(201)
    }
    catch {
        res.sendStatus(500)
    }
}