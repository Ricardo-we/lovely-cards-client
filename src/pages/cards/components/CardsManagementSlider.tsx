import {
	Add,
	Delete,
	Image as ImageIcon,
	Message as MessageIcon,
} from "@mui/icons-material";
import { FC, useEffect, useRef, useState } from "react";
import { ICardImage, ICardMessage } from "../../../types/Card";
import { Theme, Typography, useTheme } from "@mui/material";
import {
	getCardDisplayer,
	getSlide,
} from "../../../components/CardDisplayers/cardDisplayerUtils";

import ActionButtons from "../../../components/ActionButtons";
import BButton from "../../../components/Buttons/BButton";
import FlexBox from "../../../components/FlexBox";
import { useLanguageContext } from "../../../contexts/LanguageContext";

interface CardsManageMentSliderProps {
	card?: any;
	onDeleteImage?: (imageData: ICardImage) => any;
	onUpdateImage?: (imageData: ICardImage) => any;
	onDeleteMessage?: (messageData: ICardMessage) => any;
	onUpdateMessage?: (messageData: ICardMessage) => any;
	onClickCreateMessage?: () => any;
	onClickCreateImage?: () => any;
}

const CardsManagementSlider: FC<CardsManageMentSliderProps> = ({
	card,
	onClickCreateImage = () =>
		console.warn("onClickCreateImage not implemented"),
	onClickCreateMessage = () =>
		console.warn("onClickCreateMessage not implemented"),
	onDeleteImage = () => console.warn("onDeleteImage not implemented"),
	onUpdateImage = () => console.warn("onUpdateImage not implemented"),
	onDeleteMessage = () => console.warn("onDeleteMessage not implemented"),
	onUpdateMessage = () => console.warn("onUpdateMessage not implemented"),
}) => {
	// HOOKS
	const theme = useTheme();
	const styles = useStyles(theme);
	const { language } = useLanguageContext();

	// STATE
	const [cardContents, setCardContents] = useState(card?.cardContents || []);

	// REFS
	const swiperRef = useRef<any>(null);

	// DYNAMIC COMPONENTS
	const Displayer = getCardDisplayer(card?.card_type);
	const Slide = getSlide(card?.card_type);

	const mapCardContents = (cardContent: any, index: number) =>
		cardContent?.image_url ? (
			<Slide
				key={index}
				style={{
					...styles.imageSlide,
					...styles.slide,
					backgroundImage: `url(${cardContent?.image_url})`,
					backgroundAttachment: "fixed",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
				color={"white"}
			>
				<ActionButtons
					onDelete={() => onDeleteImage && onDeleteImage(cardContent)}
					onUpdate={() => onUpdateImage && onUpdateImage(cardContent)}
				/>
			</Slide>
		) : (
			<Slide
				key={index}
				style={styles.slide}
				color={cardContent?.color ?? "white"}
				// onClick={(e: any) => e.stopPropagation()}
			>
				<h4 style={{ color: cardContent?.textColor, fontSize: "25px" }}>
					{cardContent?.heading}
				</h4>
				<Typography
					style={{ color: cardContent?.textColor }}
					variant="caption"
				>
					{cardContent?.content}
				</Typography>
				<ActionButtons
					onDelete={() =>
						onDeleteMessage && onDeleteMessage(cardContent)
					}
					onUpdate={() =>
						onUpdateMessage && onUpdateMessage(cardContent)
					}
				/>
			</Slide>
		);

	const UserSlides =
		cardContents?.length > 0
			? cardContents?.map(mapCardContents)
			: [
					<Slide
						style={styles.slide}
						color={theme.palette.secondary.main}
						key={1}
					>
						<Typography
							style={{ width: "100%", textAlign: "center" }}
							color="white"
							variant="h6"
						>
							{language?.generic?.voidUserSlides}
						</Typography>
					</Slide>,
			  ];
			  

	useEffect(() => {
		if (card?.cardContents) setCardContents(card?.cardContents);
	}, [card?.cardContents]);

	useEffect(() => {
		if(card?.cardContents && swiperRef.current !== null)
			swiperRef.current?.slideTo(cardContents?.length - 1);
	}, [cardContents, swiperRef.current]);

	
	return (
		<FlexBox
			style={{ width: "100%", minWidth: "200px" }}
			direction="column"
		>
			<FlexBox
				style={{
					marginBottom: "20px",
					width: "80%",
					marginInline: "auto",
				}}
				align="center"
				justify="flex-start"
			>
				<BButton
					variant="contained"
					onClick={onClickCreateImage}
					title={language?.generic?.addImage}
					style={styles.slideButton}
				>
					<ImageIcon />
					<Add />
				</BButton>

				<BButton
					variant="contained"
					onClick={onClickCreateMessage}
					title={language?.generic?.addMessage}
					style={styles.slideButton}
				>
					<MessageIcon />
					<Add />
				</BButton>
			</FlexBox>

			<Displayer
				style={{ width: "80%", height: "80vh", marginInline: "auto" }}
				slides={[
					// ...ActionSlides,
					...UserSlides,
				]}
				onSwiper={(swiper: any) => swiperRef.current = swiper}
				autoPlay={card.auto_play}
			/>
		</FlexBox>
	);
};

const useStyles = (theme: Theme) => ({
	slide: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "80%",
		backgroundColor: theme.palette.secondary.main,
		marginHorizontal: "auto",
	},

	slideButton: {
		width: "60px",
		height: "45px",
		marginRight: "10px",
	},
	imageSlide: {
		width: "90%",
		height: "100%",
	},
	imageSlideImage: {
		width: "100%",
		height: "100%",
		// objectFit: "cover"
	},
});

export default CardsManagementSlider;

// const ActionSlides = [
// 	<Slide style={styles.slide} color={theme.palette.secondary.main}>
// 		<BButton
// 			variant="outlined"
// 			onClick={onClickCreateImage}
// 			style={styles.slideButton}
// 		>
// 			<Add />
// 			<ImageIcon />
// 		</BButton>
// 	</Slide>,
// 	<Slide style={styles.slide} color={theme.palette.secondary.main}>
// 		<BButton
// 			variant="outlined"
// 			onClick={onClickCreateMessage}
// 			style={styles.slideButton}
// 		>
// 			<Add />
// 			<MessageIcon />
// 		</BButton>
// 	</Slide>,
// ];
