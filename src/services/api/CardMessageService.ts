import { ICard, ICardMessage } from "../../types/Card";

import BaseRequest from "../../utils/libs/BaseRequest";
import { IUser } from "../../types/User";

const cardMessageReq = new BaseRequest("card-messages")

export default class CardMessageService {

    static createMessage = async (card: ICardMessage, userToken: string) => {
        const response = await cardMessageReq.post(
            card,
            { headers: cardMessageReq.createHeaders(userToken) }
        );
        return response;
    }

    static updateMessage = async (card: ICardMessage, cardMessageId: number | string, userToken: string) => {
        const response = await cardMessageReq.update(
            card, 
            { routeParams: `/${cardMessageId}`, headers: cardMessageReq.createHeaders(userToken) }
        )
        return response;
    }

    static destroyMessage = async (cardId: number | string, cardMessageId: number | string, userToken: string) => {
        const response = await cardMessageReq.destroy(
            { routeParams: `/${cardId}/${cardMessageId}`, headers: cardMessageReq.createHeaders(userToken) }
        )
        return response;
    }

}