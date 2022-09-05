import { Router } from "express";
import { createCardValidation, activateCardValidation, blockValidation } from "../middlewares/cardsMiddlewares.js";
import { createCard, activateCard, blockCard, unblockCard } from "../controllers/cardsControllers.js";

const cardRouter = Router();

cardRouter.post("/card/creation", createCardValidation, createCard);
cardRouter.put("/card/activate/:cardId", activateCardValidation, activateCard);
cardRouter.put("/card/block/:cardId", blockValidation, blockCard);
cardRouter.put("/card/unblock/:cardId", blockValidation, unblockCard);

export default cardRouter;