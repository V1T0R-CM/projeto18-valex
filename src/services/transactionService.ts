import { findByCardId as cardRecharges } from "../repositories/rechargeRepository.js";
import { findByCardId as cardPayments } from "../repositories/paymentRepository.js";
import { findById } from "../repositories/cardRepository.js";
import { dateExpired } from "./cardsService.js";
import { insert } from "../repositories/rechargeRepository.js";

async function getBalance(cardId: number) {
    const recharges = await cardRecharges(cardId);
    const payments = await cardPayments(cardId);
    let balance: number = 0;

    recharges.map(recharge => balance += recharge.amount);
    payments.map(payment => balance -= payment.amount);

    return balance
}

export async function makeCardRecharge(cardId: number, amount: number) {
    const cardInfo = await findById(cardId);
    const expired = dateExpired(cardInfo.expirationDate);

    if (!cardInfo) throw { code: "NotFound", message: "Nenhum funcionario cartão cadastrado com esse id" };
    if (!cardInfo.password) throw { code: "Unauthorized", message: "Cartão ainda não foi ativado" };
    if (expired) throw { code: "Unauthorized", message: "Cartão já se encontra expirado" };

    await insert(
        {
            cardId: cardId,
            amount: amount
        })
}