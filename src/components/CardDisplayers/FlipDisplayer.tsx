import "swiper/css/effect-cube";

import BSwiperSlider, { BSwiperSliderProps } from "../BSwiperSlider";
import { BaseDisplayer, BaseSlide } from "../../types/BaseDisplayer";
import { EffectFlip, Navigation } from "swiper";
import { FC, HTMLAttributes, useEffect } from "react";

import { children } from "../../types/Components";

export interface CardSlideProps extends BaseSlide {}

export const FlipSlide = ({ children, color, ...props }: CardSlideProps) => {
	return (
		<div
			{...props}
			style={{
				borderRadius: "10px",
                height: "100%",
				...props.style,
                width: "100%",
				backgroundColor: color,
			}}
		>
			{children}
		</div>
	);
};

interface CardsDisplayerProps extends BaseDisplayer {}

const FlipDisplayer: FC<CardsDisplayerProps> = ({ ...props }) => {
	return (
		<BSwiperSlider
			grabCursor
			modules={[EffectFlip, Navigation]}
			effect="flip"
            navigation={true}
			{...props}
		/>
	);
};

export default FlipDisplayer;
