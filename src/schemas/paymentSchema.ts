import joi from "joi";

const purchasePaymentSchemas = joi.object({
    cardId: joi.number().required(),
    password: joi.string().length(4).pattern(/^[0-9]+$/).required(),
    businessId: joi.number().required(),
    amount: joi.number().min(0.01).required()
});

export default purchasePaymentSchemas;