import { NextFunction, Request, Response } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";
import creationCardSchemas from "../schemas/ creationSchema.js";

async function createCardValidation(req: Request, res: Response, next: NextFunction) {
    const validation = creationCardSchemas.validate(req.body);
    const x_api_key = String(req.headers.x_api_key);
    const company = await findByApiKey(x_api_key);

    if (validation.error) {
        return res.status(400).send(validation.error.message)
    }

    if (!company) {
        return res.status(400).send("API not found")
    }

    next()
}

export { createCardValidation }