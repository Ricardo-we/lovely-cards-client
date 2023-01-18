import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper";
import {
	Swiper,
	SwiperProps,
	SwiperSlide,
	SwiperSlideProps,
} from "swiper/react";

import { FC } from "react";

export interface BSwiperSliderProps extends SwiperProps {
	slides?: JSX.Element[];
	slideProps?: SwiperSlideProps;
	autoPlay?: boolean;
}

const BSwiperSlider: FC<BSwiperSliderProps> = ({ slides, ...props }) => {
	const autoPlayConfig = props?.autoPlay
		? {
				delay: 2500,
				disableOnInteraction: false,
		  }
		: undefined;
	return (
		<Swiper
			{...props}
			pagination={{
				clickable: true
			}}
			modules={[
				...(props.modules ? props.modules : []),
				Pagination,
				Navigation,
				Autoplay,
			]}
			navigation={{}}
			slidesPerView="auto"
			// slidesPerGroup={slides?.length}
			// slidesPerGroupAuto
			// preventClicksPropagation={false}
			// preventClicks={false}
			// noSwiping
			
			watchSlidesProgress
			touchStartPreventDefault={false}
			// allowTouchMove={false}
			autoplay={autoPlayConfig}
			centeredSlides
		>
			<>
				{props.children}
				{!props?.children &&
					slides &&
					slides?.length > 0 &&
					slides?.map((slide, index) => (
						<SwiperSlide key={index} {...props.slideProps}>
							{slide}
						</SwiperSlide>
					))}
			</>
		</Swiper>
	);
};

export default BSwiperSlider;
