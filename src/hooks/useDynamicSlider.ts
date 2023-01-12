import { BaseDisplayer, BaseSlide } from "../types/BaseDisplayer";
import { FC, useEffect, useState } from "react";
import { getCardDisplayer, getSlide } from "../components/CardDisplayers/cardDisplayerUtils";

export function useDynamicSlider(sliderName: string="cards"){
    const [displayer, setDisplayer] = useState<FC<BaseDisplayer>>(getCardDisplayer(sliderName));    
    const [slide, setSlide] = useState<FC<BaseSlide>>(getSlide(sliderName));    

    useEffect(() =>{
        setDisplayer(getCardDisplayer(sliderName))
        setSlide(getSlide(sliderName));
    }, [sliderName])

    return [displayer, slide]

}