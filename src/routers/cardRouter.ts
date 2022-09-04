import { Router } from "express";
import { createCardValidation, activateCardValidation } from "../middlewares/cardsMiddlewares.js";
import { createCard, activateCard } from "../controllers/cardsControllers.js";

const cardRouter = Router();

cardRouter.post("/creation", createCardValidation, createCard);
cardRouter.post("/activate", activateCardValidation, activateCard);

export default cardRouter;