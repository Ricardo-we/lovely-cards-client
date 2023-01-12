import BaseRequest from "../../utils/libs/BaseRequest";
import { ICard } from "../../types/Card";
import { IUser } from "../../types/User";

const cardsRequest = new BaseRequest("cards")

export default class CardsService {

    static getUserCards = async (token: string) => {
        const userCards = await cardsRequest.find({ headers: cardsRequest.createHeaders(token) })
        return userCards
    }

    static createCard = async (card: FormData, userToken: string) => {
        const response = await cardsRequest.post(
            card,
            { headers: cardsRequest.createHeaders(userToken) }
        );
        return response;
    }

    static updateCard = async (cardId: number | string, card: FormData, userToken: string) => {
        const response = await cardsRequest.update(
            card,
            { routeParams: `/${cardId?.toString()}`, headers: cardsRequest.createHeaders(userToken) }
        );
        return response;
    }

    static getCardsWithContents = async (cardId: number|string, userToken: string) => {
        const userCards = await cardsRequest.find({ routeParams: `/${cardId}`, headers: cardsRequest.createHeaders(userToken) })
        return userCards
    }
}