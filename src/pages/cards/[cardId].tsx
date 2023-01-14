import {
	Add,
	Image as ImageIcon,
	Message as MessageIcon,
} from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import CardsManagementSlider from "./components/CardsManagementSlider";
import CardsService from "../../services/api/CardsService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

interface CardDetailsProps {}

const CardDetails: FC<CardDetailsProps> = () => {
	const router = useRouter();
	const cardId = router.query.cardId as string;
	const { user } = useAuthContext();

	const [card, setCard] = useState<any>({});
	const styles = useStyles(null,{card});

	const getCard = () =>
		CardsService.getCardsWithContents(cardId, user?.token)
			.then((res) => setCard(res))
			.catch((err) => toast.error(err.message));

	useEffect(() => {
		if (user?.token && cardId) getCard();
	}, [user?.token, cardId]);

	return (
		<main
			style={styles.mainContainer}
		>
			<ToastContainer />

			<CardsManagementSlider card={card} />
		</main>
	);
};

const useStyles = (theme: any, { card }: any) => ({
	mainContainer: {
		width: "100%",
		height: "98vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: card?.card_background,
	}
})

export default CardDetails;
