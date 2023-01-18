import CardsDisplayer, { CardSlide } from "./CardsDisplayer"
import CreativeDisplayer, { CreativeSlide } from "./CreativeDisplayer";
import CubeDisplayer, { CubeSlide } from "./CubeDisplayer";
import FlipDisplayer, { FlipSlide } from "./FlipDisplayer";

import { FC } from "react";

const SLIDES = new Map<string, FC>(); 
SLIDES.set("cards", CardSlide);
SLIDES.set("flip", FlipSlide);
SLIDES.set("cube", CubeSlide);
SLIDES.set("slides", CreativeSlide);

const DISPLAYERS = new Map<string, FC>();
DISPLAYERS.set("cards", CardsDisplayer);
DISPLAYERS.set("flip", FlipDisplayer);
DISPLAYERS.set("cube", CubeDisplayer);
DISPLAYERS.set("slides", CreativeDisplayer);

export function getCardDisplayer(displayerName: string):any{
    return DISPLAYERS.get(displayerName) ?? DISPLAYERS.get("cards"); 
}

export function getSlide(slideName: string): any {
    return SLIDES.get(slideName) ?? SLIDES.get("cards");
}