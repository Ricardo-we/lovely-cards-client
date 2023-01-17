import { FC, useEffect, useState } from "react";
import { Theme, Typography, useTheme } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import {
	getCardDisplayer,
	getSlide,
} from "../../components/CardDisplayers/cardDisplayerUtils";

import BButton from "../../components/Buttons/BButton";
import CardsService from "../../services/api/CardsService";
import FlexBox from "../../components/FlexBox";
import { GetServerSideProps } from "next";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useAudio } from "../../hooks/useAudio";

interface CardViewProps {
	card: any;
	error?: any;
}

const CardView: FC<CardViewProps> = ({ card, error }) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { toggleAudioActive, audioActive } = useAudio(card?.music);
	// const router = useRouter();
	// const { language } = useLanguageContext();

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
				onClick={(e: any) => e.stopPropagation()}
			/>
		) : (
			<Slide
				key={index}
				style={styles.slide}
				color={cardContent?.color ?? "white"}
				onClick={(e: any) => e.stopPropagation()}
			>
				<h4 style={{ fontSize: "25px" }}>{cardContent?.heading}</h4>
				<Typography variant="caption">
					{cardContent?.content}
				</Typography>
			</Slide>
		);

	if (!card || error)
		return (
			<>
				<h3>Card not found :C</h3>
			</>
		);

	return (
		<main
			style={{
				...styles.mainContainer,
				backgroundColor: card?.card_background,
			}}
		>
			<ToastContainer />

			<FlexBox style={{width: "85%", padding: "20px", marginInline: "auto", marginBottom:"10px"}} align="center" justify="flex-start">
                <Typography style={{marginRight: "20px"}} variant="h4" >{card?.title}</Typography>
				<BButton
					variant="contained"
					color="info"
					onClick={toggleAudioActive}
				>
					{audioActive ? <PauseIcon /> : <PlayArrowIcon />}
				</BButton>
			</FlexBox>
            
			<Displayer
				style={{ width: "80%", height: "80vh", marginInline: "auto" }}
				slides={card?.cardContents?.map(mapCardContents)}
			/>
		</main>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const cardId: number = parseInt(context.params?.cardId as string);
		const card = await CardsService.getCardsWithContents(cardId);

		return {
			props: {
				card,
			},
		};
	} catch (error) {
		return {
			props: {
				card: {},
				error,
			},
		};
	}
};

const useStyles = (theme: Theme) => ({
	slide: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "90%",
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
	mainContainer: {
		width: "100%",
		minHeight: "100vh",
		alignItems: "center",
	},
});

export default CardView;
