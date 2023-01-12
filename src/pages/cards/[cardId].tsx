import {
	Add,
	Image as ImageIcon,
	Message as MessageIcon,
} from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import { ICardImage, ICardMessage } from "../../types/Card";
import { ToastContainer, toast } from "react-toastify";
import { Typography, makeStyles } from "@mui/material";
import {
	getCardDisplayer,
	getSlide,
} from "../../components/CardDisplayers/cardDisplayerUtils";

import BButton from "../../components/Buttons/BButton";
import CardsDisplayer from "../../components/CardDisplayers/CardsDisplayer";
import CardsService from "../../services/api/CardsService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useDynamicSlider } from "../../hooks/useDynamicSlider";
import { useRouter } from "next/router";

interface CardDetailsProps {}

const CardDetails: FC<CardDetailsProps> = () => {
	const router = useRouter();
	const cardId = router.query.cardId as string;
	const { user } = useAuthContext();
	const [card, setCard] = useState<any>({});
	// const [Displayer, Slide] = useDynamicSlider(card?.card_type);
	const Displayer = getCardDisplayer(card?.card_type);
	const Slide = getSlide(card?.card_type);

	const ActionSlides = [
		<Slide style={styles.slide} color="#fff">
			<BButton style={styles.slideButton}>
				<Add />
				<ImageIcon />
			</BButton>
		</Slide>,
		<Slide style={styles.slide} color="#fff">
			<BButton style={styles.slideButton}>
				<Add />
				<MessageIcon />
			</BButton>
		</Slide>,
	];

    const UserSlides = card?.cardContents ? card?.cardContents?.map((cardContent: any) => (
        cardContent?.image_url 
            ? <Slide style={styles.imageSlide} color={"white"}>
                <img style={{ objectFit: "cover",...styles.imageSlideImage}} loading="lazy" src={cardContent?.image_url} alt="" />
            </Slide> 
            : <Slide style={styles.slide} color={cardContent?.color ?? "white"}>
                <h4 style={{fontSize: "25px"}}>{cardContent?.heading}</h4>
                <Typography variant="caption">{cardContent?.content}</Typography>
            </Slide>
    )) : [];

	const getCard = () =>
		CardsService.getCardsWithContents(cardId, user?.token)
			.then((res) => setCard(res))
			.catch((err) => toast.error(err.message));

	useEffect(() => {
		if (user?.token && cardId) getCard();
	}, [user]);

	return (
		<>
			<ToastContainer />

			<Displayer style={{ width: "80%", height: "300px" }} slides={[...ActionSlides,...UserSlides]} />
		</>
	);
};

const styles = {
	slide: {
		display: "flex",
        flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	slideButton: {
		width: "80%",
		height: "80%",
	},
    imageSlide: {
        width:"100%",
        height: "100%"
    },
    imageSlideImage: {
        width: "100%",
        height: "100%",
        // objectFit: "cover"
    }
};

export default CardDetails;
