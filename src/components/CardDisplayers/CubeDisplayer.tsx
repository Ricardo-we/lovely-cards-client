import "swiper/css/effect-cube";

import BSwiperSlider, { BSwiperSliderProps } from "../BSwiperSlider";
import { BaseDisplayer, BaseSlide } from "../../types/BaseDisplayer";

import { EffectCube } from "swiper";
import { FC, } from "react";
import { children } from "../../types/Components";

export interface CardSlideProps extends BaseSlide {}

export const CubeSlide = ({ children, color, ...props }: CardSlideProps) => {
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

const CubeDisplayer: FC<CardsDisplayerProps> = ({ ...props }) => {
	return (
		<BSwiperSlider
			grabCursor
			cubeEffect={{
				shadow: true,
				slideShadows: true,
				shadowOffset: 20,
				shadowScale: 0.94,
			  }}
			modules={[EffectCube]}
			effect="cube"
			{...props}
		/>
	);
};

export default CubeDisplayer;
