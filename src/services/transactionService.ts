import { findByCardId as cardRecharges } from "../repositories/rechargeRepository.js";
import { findByCardId as cardPayments } from "../repositories/paymentRepository.js";
import { findById as findCard } from "../repositories/cardRepository.js";
import { findById as findBusiness } from "../repositories/businessRepository.js";
import { dateExpired } from "./cardsService.js";
import { insert as insertRecharge } from "../repositories/rechargeRepository.js";
import { insert as insertPayment } from "../repositories/paymentRepository.js";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

const CRRYPTR_SECRET_KEY = process.env.CRRYPTR_SECRET_KEY;
const cryptr = new Cryptr(CRRYPTR_SECRET_KEY);

export async function makeCardRecharge(cardId: number, amount: number) {
    const cardInfo = await findCard(cardId);
    const expired = dateExpired(cardInfo.expirationDate);

    if (!cardInfo) throw { code: "NotFound", message: "Nenhum cartão cadastrado com esse id" };
    if (!cardInfo.password) throw { code: "Unauthorized", message: "Cartão não esta ativo" };
    if (expired) throw { code: "Unauthorized", message: "Cartão já se encontra expirado" };

    await insertRecharge(
        {
            cardId: cardId,
            amount: amount
        })
}

export async function purchase(cardId: number, password: string, businessId: number, amount: number) {
    const cardInfo = await findCard(cardId);
    const expired = dateExpired(cardInfo.expirationDate);
    const businessInfo = await findBusiness(businessId);
    const balance = await getBalance(cardId);

    if (!cardInfo) throw { code: "NotFound", message: "Nenhum cartão cadastrado com esse id" };
    if (cardInfo.isBlocked) throw { code: "Unauthorized", message: "Cartão esta bloqueado" };
    if (!cardInfo.password) throw { code: "Unauthorized", message: "Cartão não esta ativo" };
    if (password !== cryptr.decrypt(cardInfo.password)) throw { code: "Unauthorized", message: "Senha invalida" };
    if (expired) throw { code: "Unauthorized", message: "Cartão já se encontra expirado" };
    if (!businessInfo) throw { code: "NotFound", message: "Nenhum estabelecimento cadastrado com esse id" };
    if (businessInfo.type !== cardInfo.type) throw { code: "Unauthorized", message: "Tipo de cartão invalido" };
    if (amount > balance) throw { code: "Unauthorized", message: "Saldo insuficiente" };

    await insertPayment(
        {
            cardId: cardId,
            businessId: businessId,
            amount: amount
        })
}

export async function generateReport(cardId: number) {
    const recharges = await cardRecharges(cardId);
    const payments = await cardPayments(cardId);
    const balance = await getBalance(cardId);

    return {
        balance: balance,
        transactions: payments,
        recharges: recharges
    }
}
async function getBalance(cardId: number) {
    const recharges = await cardRecharges(cardId);
    const payments = await cardPayments(cardId);
    let balance: number = 0;

    recharges.map(recharge => balance += recharge.amount);
    payments.map(payment => balance -= payment.amount);

    return balance
}