import { findById as findCardById, findByTypeAndEmployeeId, TransactionTypes, insert, update } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

const CRRYPTR_SECRET_KEY = process.env.CRRYPTR_SECRET_KEY;
const cryptr = new Cryptr(CRRYPTR_SECRET_KEY);

export async function generateCardInfo(api: string, employeeId: number, cardType: TransactionTypes) {
    const company = await findByApiKey(api);
    const employee = await findById(employeeId);
    const cardsOfTheChosenType = await findByTypeAndEmployeeId(cardType, employeeId);
    const cardNumber = faker.finance.creditCardNumber();
    const cardCVV = faker.finance.creditCardCVV();
    const cryptNumberCVV = cryptr.encrypt(cardCVV);
    const cardholderName = generateAbreviatedName(employee.fullName);
    const expirationDate = generateExpirationDate()

    if (!company) throw { code: "NotFound", message: "Nenhuma empresa tem essa chave de API não esta cadastrada" };
    if (!employee) throw { code: "NotFound", message: "Nenhum funcionario cadastrado com esse id" };
    if (cardsOfTheChosenType) throw { code: "NotFound", message: "Funcionario já possui um cartão desse tipo" };

    await insert(
        {
            employeeId: employeeId,
            number: cardNumber,
            cardholderName: cardholderName,
            securityCode: cryptNumberCVV,
            expirationDate: expirationDate,
            isVirtual: false,
            isBlocked: false,
            type: cardType
        }
    );
}

function generateAbreviatedName(name: string): string {
    let abreviateName: string = "";
    let namesList: string[] = name.toUpperCase().split(" ").filter(name => name.length > 3);
    abreviateName += namesList[0];
    for (let i = 1; i < namesList.length - 1; i++) {
        abreviateName += " "
        abreviateName += namesList[i][0]
    }
    abreviateName += " " + namesList[namesList.length - 1]

    return abreviateName
}

function generateExpirationDate(): string {
    const currentData = dayjs().format("MM/YY");
    return currentData.slice(0, 3) + String(Number(currentData.slice(3)) + 5)
}

export async function activateCardPassword(cardId: number, cardCVV: string, password: string) {
    const cardInfo = await findCardById(cardId);
    const decryptNumberCVV = cryptr.decrypt(cardInfo.securityCode);
    const cryptPassword = cryptr.encrypt(password);
    const expired = dateExpired(cardInfo.expirationDate);

    if (!cardInfo) throw { code: "NotFound", message: "Nenhum cartão cadastrado com esse id" };
    if (cardInfo.password) throw { code: "Conflict", message: "Cartão já se encontra ativo" };
    if (expired) throw { code: "Unauthorized", message: "Cartão já se encontra expirado" };
    if (cardCVV !== decryptNumberCVV) throw { code: "Unauthorized", message: "Codigo de segurança invalido" };

    await update(cardId, { ...cardInfo, password: cryptPassword });
}

export function dateExpired(validThru: string) {
    const [monthValid, yearValid] = validThru.split("/");
    const [currentMonth, currentYear] = dayjs().format("MM/YY").split("/");

    if (Number(yearValid) > Number(currentYear)) {
        return false
    }
    else if (Number(yearValid) === Number(currentYear) && Number(monthValid) >= Number(currentMonth)) {
        return false
    }
    else {
        return true
    }
}