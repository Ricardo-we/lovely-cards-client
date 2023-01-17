import "swiper/css";
import "swiper/css/pagination";

import {
	Swiper,
	SwiperProps,
	SwiperSlide,
	SwiperSlideProps,
} from "swiper/react";

import { FC } from "react";
import { Pagination } from "swiper";

export interface BSwiperSliderProps extends SwiperProps {
	slides?: JSX.Element[];
	slideProps?: SwiperSlideProps;
}

const BSwiperSlider: FC<BSwiperSliderProps> = ({ slides, ...props }) => {
	return (
		<Swiper
			{...props}
			pagination
			modules={[Pagination, ...(props.modules ? props.modules : [])]}
		>
			{props.children}
			{!props?.children &&
				slides?.map((slide) => (
					<SwiperSlide {...props.slideProps}>{slide}</SwiperSlide>
				))}
		</Swiper>
	);
};

export default BSwiperSlider;
