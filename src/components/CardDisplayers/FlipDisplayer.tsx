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
				// borderRadius: "10px",
				...props.style,
                height: "100%",
                width: "100%",
				backgroundColor: color,
				transform: "translate3d(0px,0px,10px)"
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
