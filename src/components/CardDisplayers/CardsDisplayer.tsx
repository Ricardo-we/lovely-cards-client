import BSwiperSlider, { BSwiperSliderProps } from "../BSwiperSlider";
import { BaseDisplayer, BaseSlide } from "../../types/BaseDisplayer";
import { FC, HTMLAttributes, useEffect } from "react";

import { EffectCards } from "swiper";
import { children } from "../../types/Components";

export interface CardSlideProps extends BaseSlide {}

export const CardSlide = ({ children, color, ...props }: CardSlideProps) => {
	return (
		<div
			{...props}
			style={{
				borderRadius: "10px",
                height: "100%",
				...props.style,
				backgroundColor: color,
			}}
		>
			{children}
		</div>
	);
};

interface CardsDisplayerProps extends BaseDisplayer {}

const CardsDisplayer: FC<CardsDisplayerProps> = ({ ...props }) => {
	return (
		<BSwiperSlider
			grabCursor
			modules={[EffectCards]}
			effect="cards"
			{...props}
		/>
	);
};

export default CardsDisplayer;
