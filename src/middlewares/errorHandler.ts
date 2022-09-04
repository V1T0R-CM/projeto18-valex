import { NextFunction, Request, Response } from "express";

export default async function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error.code === 'NotFound') {
        return res.status(404).send(error.message)
    }
    res.sendStatus(500)
}