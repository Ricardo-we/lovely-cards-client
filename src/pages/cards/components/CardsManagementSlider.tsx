import {
	Add,
	Delete,
	Image as ImageIcon,
	Message as MessageIcon,
} from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import { ICardImage, ICardMessage } from "../../../types/Card";
import { Theme, Typography, useTheme } from "@mui/material";
import {
	getCardDisplayer,
	getSlide,
} from "../../../components/CardDisplayers/cardDisplayerUtils";

import ActionButtons from "../../../components/ActionButtons";
import BButton from "../../../components/Buttons/BButton";

interface CardsManageMentSliderProps {
	card?: any;
	onDeleteImage?: (imageData: ICardImage) => any;
	onDeleteMessage?: (messageData: ICardMessage) => any;
	onUpdateMessage?: (messageData: ICardMessage) => any;
	onClickCreateMessage?: () => any;
	onClickCreateImage?: () => any;
}

const CardsManagementSlider: FC<CardsManageMentSliderProps> = ({
	card,
	onClickCreateImage=() => console.warn("onClickCreateImage not implemented"),
	onClickCreateMessage=() => console.warn("onClickCreateMessage not implemented"),
	onDeleteImage=() => console.warn("onDeleteImage not implemented"),
	onDeleteMessage=() => console.warn("onDeleteMessage not implemented"),
	onUpdateMessage=() => console.warn("onUpdateMessage not implemented"),
}) => {
	// HOOKS
	const theme = useTheme();
	const styles = useStyles(theme);

	// STATE
	const [cardContents, setCardContents] = useState(card?.cardContents || []);

	// DYNAMIC COMPONENTS
	const Displayer = getCardDisplayer(card?.card_type);
	const Slide = getSlide(card?.card_type);

	const mapCardContents = (cardContent: any, index: number) =>
		cardContent?.image_url ? (
			<Slide key={index} style={styles.imageSlide} color={"white"}>
				<img
					style={{
						objectFit: "cover",
						...styles.imageSlideImage,
					}}
					loading="lazy"
					src={cardContent?.image_url}
					alt=""
				/>
                <BButton onClick={() => onDeleteImage && onDeleteImage(cardContent)}>
                    <Delete/>
                </BButton>
			</Slide>
		) : (
			<Slide
				key={index}
				style={styles.slide}
				color={cardContent?.color ?? "white"}
			>
				<h4 style={{ fontSize: "25px" }}>{cardContent?.heading}</h4>
				<Typography variant="caption">
					{cardContent?.content}
				</Typography>
                <ActionButtons
                    onDelete={() => onDeleteMessage && onDeleteMessage(cardContent)}
                    onUpdate={() => onUpdateMessage && onUpdateMessage(cardContent)}
                />
			</Slide>
		);

	const ActionSlides = [
		<Slide style={styles.slide} color={theme.palette.secondary.main}>
			<BButton onClick={onClickCreateImage} style={styles.slideButton}>
				<Add />
				<ImageIcon />
			</BButton>
		</Slide>,
		<Slide style={styles.slide} color={theme.palette.secondary.main}>
			<BButton onClick={onClickCreateMessage} style={styles.slideButton}>
				<Add />
				<MessageIcon />
			</BButton>
		</Slide>,
	];

	const UserSlides =
		cardContents?.length > 0 ? cardContents?.map(mapCardContents) : [];

	useEffect(() => {
		if (card?.cardContents) setCardContents(card?.cardContents);
	}, [card?.cardContents]);

	return (
		<Displayer
			style={{ width: "80%", height: "80vh", marginInline: "auto" }}
			slides={[...UserSlides, ...ActionSlides]}
		/>
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
		width: "80%",
		height: "80%",
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
