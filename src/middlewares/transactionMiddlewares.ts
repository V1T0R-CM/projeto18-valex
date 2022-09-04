import { NextFunction, Request, Response } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById as findCardById } from "../repositories/cardRepository.js";
import { findById as findEmployeeById } from "../repositories/employeeRepository.js";
import rechargeCardSchemas from "../schemas/rechargeShema.js";
import purchasePaymentSchemas from "../schemas/paymentSchema.js";

export async function rechargeCardValidation(req: Request, res: Response, next: NextFunction) {
    const validation = rechargeCardSchemas.validate(req.body);
    const x_api_key = String(req.headers.x_api_key);
    const company = await findByApiKey(x_api_key);
    const card = await findCardById(req.body.cardId);
    const employee = await findEmployeeById(card.employeeId)

    if (validation.error) {
        return res.status(400).send(validation.error.message)
    }

    if (!company) {
        return res.status(404).send("API não encontrada")
    }

    if (company.id !== employee.companyId) {
        return res.status(401).send("Cartão não pertence a um funcionario da empresa")
    }

    next()
}

export async function paymentValidation(req: Request, res: Response, next: NextFunction) {
    const validation = purchasePaymentSchemas.validate(req.body);

    if (validation.error) {
        return res.status(400).send(validation.error.message)
    }

    next()
}