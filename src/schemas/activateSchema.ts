import joi from "joi";

const activateCardSchemas = joi.object({
    cardId: joi.number().required(),
    CVC: joi.string().required(),
    password: joi.string().length(4).pattern(/^[0-9]+$/).required()
});

export default activateCardSchemas;