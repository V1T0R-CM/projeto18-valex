import cors from 'cors';
import express from 'express';
import dotenv from "dotenv";
import "express-async-errors";
import errorHandler from './middlewares/errorHandler.js';
import router from './routers/index.js';

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Rodando na porta na porta: ${PORT}`))