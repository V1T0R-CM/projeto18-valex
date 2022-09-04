import { Router } from "express";
import { createCardValidation } from "../middlewares/cardsMiddlewares.js";
import { createCard } from "../controllers/cardsControllers.js";

const cardRouter = Router();

cardRouter.post("/creation", createCardValidation, createCard);

export default cardRouter;