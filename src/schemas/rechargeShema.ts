import joi from "joi";

const rechargeCardSchemas = joi.object({
    cardId: joi.number().required(),
    amount: joi.number().min(0).required()
});

export default rechargeCardSchemas;