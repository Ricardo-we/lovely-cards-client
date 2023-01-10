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
}