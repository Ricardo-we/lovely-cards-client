import { HTMLAttributes } from "react";
import { BSwiperSliderProps } from "../components/BSwiperSlider";

export interface BaseDisplayer extends BSwiperSliderProps {

}

export interface BaseSlide extends HTMLAttributes<HTMLDivElement> {
	children?: children;
	color?: string;
}