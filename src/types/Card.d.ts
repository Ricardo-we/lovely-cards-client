import { SequleizeBaseModel } from "./BaseModel";

export interface ICard extends SequleizeBaseModel {
    id
    title?: string,
    music?: string
    music_public_id?: string
    card_background: string
    card_background_type: "decorated_image" | "image" | "color"
    user_id?: number;
    card_type?: string;
    auto_play?: boolean;
}

export interface ICardMessage extends SequleizeBaseModel{
    heading?: string;
    content?: string;
    color?: string
    card_id?: number | string;
    orderNumber?: number;
    textColor?: string;
}

export interface ICardImage extends SequleizeBaseModel {
    image_url?: string;
    image_id?: string;
    card_id?: number;
    orderNumber?: number;
}   