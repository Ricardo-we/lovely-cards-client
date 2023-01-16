import { ICard, ICardImage, ICardMessage } from "../../types/Card";

import BaseRequest from "../../utils/libs/BaseRequest";
import { parseJsonToFormData } from "../../utils/generic/form.utils";

const cardMessageReq = new BaseRequest("card-images")

export default class CardImageService {

    static createImage = async (card: ICardMessage, userToken: string) => {
        const formData = parseJsonToFormData(card);
        const response = await cardMessageReq.post(
            formData,
            { headers: cardMessageReq.createHeaders(userToken) }
        );
        return response;
    }

    static updateImage = async (card: ICardImage, cardMessageId: number | string, userToken: string) => {
        const formData = parseJsonToFormData(card);
        const response = await cardMessageReq.update(
            formData, 
            { routeParams: `/${cardMessageId}`, headers: cardMessageReq.createHeaders(userToken) }
        )
        return response;
    }

    static destroyImage = async (cardId: number | string, cardImageId: number | string, userToken: string) => {
        const response = await cardMessageReq.destroy(
            { routeParams: `/${cardId}/${cardImageId}`, headers: cardMessageReq.createHeaders(userToken) }
        )
        return response;
    }

}