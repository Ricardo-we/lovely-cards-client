import "swiper/css";

import { Swiper, SwiperProps, SwiperSlide, SwiperSlideProps } from "swiper/react";

import { FC } from "react";

export interface BSwiperSliderProps extends SwiperProps {
	slides?: JSX.Element[];
	slideProps?: SwiperSlideProps
}

const BSwiperSlider: FC<BSwiperSliderProps> = ({ slides, ...props }) => {
	return (
		<Swiper {...props}>
			{props.children}
			{!props?.children && slides?.map((slide) => (
				<SwiperSlide {...props.slideProps}>{slide}</SwiperSlide>
			))}
		</Swiper>
	);
};

export default BSwiperSlider;
