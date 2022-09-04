import { NextFunction, Request, Response } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";
import creationCardSchemas from "../schemas/ creationSchema.js";
import activateCardSchemas from "../schemas/activateSchema.js";

export async function createCardValidation(req: Request, res: Response, next: NextFunction) {
    const validation = creationCardSchemas.validate(req.body);
    const x_api_key = String(req.headers.x_api_key);
    const company = await findByApiKey(x_api_key);

    if (validation.error) {
        return res.status(400).send(validation.error.message)
    }

    if (!company) {
        return res.status(404).send("API not found")
    }

    next()
}

export async function activateCardValidation(req: Request, res: Response, next: NextFunction) {
    const validation = activateCardSchemas.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.message)
    }

    next()
}