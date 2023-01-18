import "swiper/css/effect-cube";

import BSwiperSlider, { BSwiperSliderProps } from "../BSwiperSlider";
import { BaseDisplayer, BaseSlide } from "../../types/BaseDisplayer";

import { EffectCube } from "swiper";
import { FC, } from "react";
import { children } from "../../types/Components";
import zIndex from "@mui/material/styles/zIndex";

export interface CardSlideProps extends BaseSlide {}

export const CubeSlide = ({ children, color, ...props }: CardSlideProps) => {
	return  (
		<div
			{...props}
			style={{
				...props.style,
                borderRadius: "10px",
                height: "100%",
                width: "100%",
				backgroundColor: color,
				zIndex: 9999,
				transform: "translate3d(0px, 0px, 10px)"
			}}
			// onClick={console.log("SSS")}
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
			modules={[EffectCube]}
			cubeEffect={{
				shadow: true,
				slideShadows: true,
				shadowOffset: 20,
				shadowScale: 0.94,
			}}
			effect="cube"
			style={{position: "absolute"}}
			resistanceRatio={0}
			// slideProps={{ style: {zIndex: 1} }}
			{...props}
		/>
	);
};

export default CubeDisplayer;
