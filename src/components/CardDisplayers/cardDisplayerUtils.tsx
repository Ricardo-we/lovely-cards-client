import CardsDisplayer, { CardSlide } from "./CardsDisplayer"

import { FC } from "react";

const SLIDES = new Map<string, FC>(); 
SLIDES.set("cards", CardSlide);

const DISPLAYERS = new Map<string, FC>();
DISPLAYERS.set("cards", CardsDisplayer);

export function getCardDisplayer(displayerName: string):any{
    return DISPLAYERS.get(displayerName) ?? DISPLAYERS.get("cards"); 
}

export function getSlide(slideName: string): any {
    return SLIDES.get(slideName) ?? SLIDES.get("cards");
}