import "swiper/css/effect-cube";
import "swiper/css/effect-creative";

import BSwiperSlider, { BSwiperSliderProps } from "../BSwiperSlider";
import { BaseDisplayer, BaseSlide } from "../../types/BaseDisplayer";
import { EffectFlip, Navigation } from "swiper";
import React, { FC, HTMLAttributes, useEffect } from "react";

import { EffectCreative } from "swiper";

export interface CardSlideProps extends BaseSlide {}

export const CreativeSlide = ({ children, color, ...props }: CardSlideProps) => {
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

const CreativeDisplayer: FC<CardsDisplayerProps> = ({ ...props }) => {
	return (
		<BSwiperSlider
			grabCursor
			modules={[EffectCreative]}
			effect="creative"
			creativeEffect={{
				prev: {
					shadow: true,
					translate: [0, 0, -400],
				},
				next: {
					translate: ["100%", 0, 0],
				},
			}}
			{...props}
		/>
	);
};

export default CreativeDisplayer;
