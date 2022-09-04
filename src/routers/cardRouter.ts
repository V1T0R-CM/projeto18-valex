import { Router } from "express";
import { createCardValidation, activateCardValidation, blockValidation } from "../middlewares/cardsMiddlewares.js";
import { createCard, activateCard, blockCard, unblockCard } from "../controllers/cardsControllers.js";

const cardRouter = Router();

cardRouter.post("/creation", createCardValidation, createCard);
cardRouter.put("/activate", activateCardValidation, activateCard);
cardRouter.put("/block/:cardId", blockValidation, blockCard);
cardRouter.put("/unblock/:cardId", blockValidation, unblockCard);

export default cardRouter;