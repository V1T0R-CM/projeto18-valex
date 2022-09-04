import joi from "joi";

const passwordSchemas = joi.object({
    password: joi.string().length(4).pattern(/^[0-9]+$/).required()
});

export default passwordSchemas;