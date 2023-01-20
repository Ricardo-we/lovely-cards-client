import {
	Add,
	Image as ImageIcon,
	Message as MessageIcon,
} from "@mui/icons-material";
import { CSSProperties, FC, useEffect, useState } from "react";
import { ICard, ICardImage, ICardMessage } from "../../types/Card";
import { ToastContainer, toast } from "react-toastify";

import CardImageFormModal from "./components/CardImageFormModal";
import CardImageService from "../../services/api/CardImageService";
import CardMessageFormModal from "./components/CardMessageFormModal";
import CardMessageService from "../../services/api/CardMessageService";
import CardsManagementSlider from "./components/CardsManagementSlider";
import CardsService from "../../services/api/CardsService";
import DeleteDialog from "../../components/DeleteDialog";
import { FormActionTypes } from "../../types/Forms";
import GoogleAdd from "../../components/Adds/GoogleAdd";
import { Typography } from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { useRouter } from "next/router";

interface CardDetailsProps {}

const CardDetails: FC<CardDetailsProps> = () => {
	const router = useRouter();
	const cardId = parseInt(router.query.cardId as string);
	const { user } = useAuthContext();
	const { language } = useLanguageContext();

	// CARD
	const [card, setCard] = useState<any>({});
	// CARD-MESSAGE STATE
	const [cardMessageFormModalVisible, setCardMessageFormModalVisible] =
		useState<boolean>(false);
	const [selectedCardMessage, setSelectedCardMessage] =
		useState<ICardMessage>({});
	const [cardMessageFormModalAction, setCardMessageFormModalAction] =
		useState<FormActionTypes>("create");
	const [deleteCardMessageDialogOpen, setDeleteCardMessageDialogOpen] =
		useState<boolean>(false);

	// CARD-IMAGE STATE
	const [cardImageFormModalOpen, setCardImageFormModalOpen] =
		useState<boolean>(false);
	const [selectedCardImage, setSelectedCardImage] = useState<ICardImage>({});
	const [cardImageFormModalAction, setCardImageFormModalAction] =
		useState<FormActionTypes>("create");
	const [deleteCardImageDialogOpen, setCardImageDialogOpen] =
		useState<boolean>(false);

	const styles = useStyles(null, { card });

	const handleDefaultResponse = (promise: Promise<any>) =>
		promise.then(getCard).catch((err) => toast.error(err?.message));

	const getCard = () =>
		CardsService.getCardsWithContents(cardId, user?.token)
			.then((res) => setCard(res))
			.catch((err) => toast.error(err?.message));

	const createCardMessage = (data: ICardMessage) => {
		if (data && user?.token)
			return handleDefaultResponse(
				CardMessageService.createMessage(data, user?.token),
			);
	};

	const updateCardMessage = (data: ICardMessage) => {
		if (data && user?.token && data.id)
			return handleDefaultResponse(
				CardMessageService.updateMessage(data, data?.id, user?.token),
			);
	};

	const deleteMessage = (cardMessage: ICardMessage) => {
		if (user?.token && cardMessage?.card_id && cardMessage?.id) {
			setSelectedCardMessage({});
			return handleDefaultResponse(
				CardMessageService.destroyMessage(
					cardMessage?.card_id || -1,
					cardMessage?.id || -1,
					user?.token,
				),
			);
		}
	};

	const createCardImage = (cardImage: ICardImage) => {
		if (user?.token && cardImage && cardId)
			return handleDefaultResponse(
				CardImageService.createImage(
					{ ...cardImage, card_id: cardId },
					user?.token,
				),
			);
	};

	const updateCardImage = (
		cardImage: ICardImage | any,
		oldCardImage: ICardImage | any,
	) => {
		const formattedCardImage = {
			card_id: oldCardImage.card_id,
			image_url: cardImage?.image_url,
			image: cardImage?.image,
		};

		if (user?.token && oldCardImage?.id)
			return handleDefaultResponse(
				CardImageService.updateImage(
					formattedCardImage,
					oldCardImage.id,
					user?.token,
				),
			);
	};

	const deleteCardImage = (
		card_id: number | string,
		cardImageId: number | string,
	) => {
		if (user?.token)
			return handleDefaultResponse(
				CardImageService.destroyImage(
					card_id,
					cardImageId,
					user?.token,
				),
			);
	};

	const handleCardImageSubmit = (cardImage: ICardImage) => {
		if (cardImageFormModalAction === "create")
			createCardImage(cardImage)?.finally(() =>
				setCardImageFormModalOpen(false),
			);
		else if (cardImageFormModalAction === "update")
			updateCardImage(cardImage, selectedCardImage)?.finally(() =>
				setCardImageFormModalOpen(false),
			);
	};

	useEffect(() => {
		if (user && !user?.token) router.push("/auth/login");
		if (user?.token && cardId) getCard();
	}, [user?.token, cardId]);

	return (
		<main style={styles.mainContainer as CSSProperties}>
			<ToastContainer />

			{/* CARD-MESSAGE-CRUD OPERATIONS */}
			<CardMessageFormModal
				visible={cardMessageFormModalVisible}
				resetOnSubmit
				onSubmit={(data) => {
					if (cardMessageFormModalAction === "create" && cardId) {
						createCardMessage({
							...data,
							card_id: cardId,
						})?.finally(() =>
							setCardMessageFormModalVisible(false),
						);
					} else if (
						cardMessageFormModalAction === "update" &&
						cardId
					) {
						setSelectedCardMessage({});
						updateCardMessage({
							...data,
							card_id: cardId,
						})?.finally(() =>
							setCardMessageFormModalVisible(false),
						);
					}
				}}
				formTitle={
					cardMessageFormModalAction === "create"
						? language?.view?.cardMessage?.createMessage
						: language?.view?.cardMessage?.updateMessage
				}
				buttonText={
					cardMessageFormModalAction === "create"
						? language?.generic?.create
						: language?.generic?.update
				}
				onClose={() => setCardMessageFormModalVisible(false)}
				initialValues={selectedCardMessage}
			/>

			<DeleteDialog
				visible={deleteCardMessageDialogOpen}
				title={`${language?.generic?.wishDelete}:  ${selectedCardMessage?.heading}`}
				onDeleteItem={() => {
					deleteMessage(selectedCardMessage);
					setDeleteCardMessageDialogOpen(false);
				}}
				onClose={() => setDeleteCardMessageDialogOpen(false)}
			/>

			{/* CARD-IMAGES-CRUD OPERATIONS */}

			<CardImageFormModal
				visible={cardImageFormModalOpen}
				formTitle={
					cardImageFormModalAction === "create"
						? language?.view?.cardImage?.createImage
						: language?.view?.cardImage?.updateImage
				}
				buttonText={
					cardImageFormModalAction === "create"
						? language?.generic?.create
						: language?.generic?.update
				}
				onClose={() => setCardImageFormModalOpen(false)}
				onSubmit={(cardImage) =>
					cardImage && handleCardImageSubmit(cardImage)
				}
				initialValues={selectedCardImage}
			/>

			<DeleteDialog
				visible={deleteCardImageDialogOpen}
				title={`${language?.generic?.sureToDelete}`}
				onDeleteItem={() => {
					if (selectedCardImage?.card_id && selectedCardImage?.id)
						deleteCardImage(
							selectedCardImage?.card_id,
							selectedCardImage?.id,
						);
					setCardImageDialogOpen(false);
				}}
				onClose={() => setCardImageDialogOpen(false)}
			/>

			<CardsManagementSlider
				card={card}
				onClickCreateMessage={() => {
					setCardMessageFormModalVisible(true);
					setCardMessageFormModalAction("create");
					setSelectedCardMessage({});
				}}
				onUpdateMessage={(oldMessage) => {
					setCardMessageFormModalAction("update");
					setSelectedCardMessage(oldMessage);
					setCardMessageFormModalVisible(true);
				}}
				onDeleteMessage={(oldMessage) => {
					setSelectedCardMessage(oldMessage);
					setDeleteCardMessageDialogOpen(true);
				}}
				onClickCreateImage={() => {
					setCardImageFormModalAction("create");
					setCardImageFormModalOpen(true);
				}}
				onUpdateImage={(cardImage) => {
					setSelectedCardImage(cardImage);
					setCardImageFormModalAction("update");
					setCardImageFormModalOpen(true);
				}}
				onDeleteImage={(cardImage) => {
					setSelectedCardImage(cardImage);
					setCardImageDialogOpen(true);
				}}
			/>
			
			<GoogleAdd/>
		</main>
	);
};

const useStyles = (theme: any, { card }: any) => ({
	mainContainer: {
		width: "100%",
		height: "98vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: card?.card_background,
	},
});

export default CardDetails;
