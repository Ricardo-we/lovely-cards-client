import { FC, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Add } from "@mui/icons-material";
import CardFormModal from "./components/CardFormModal";
import CardsService from "../../services/api/CardsService";
import DeleteDialog from "../../components/DeleteDialog";
import FlexBox from "../../components/FlexBox";
import { ICard } from "../../types/Card";
import { IconButton } from "@mui/material";
import UserCardsList from "./components/UserCardsList";
import { replaceWithList } from "../../utils/generic/string.utils";
import { useAuthContext } from "../../contexts/AuthContext";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { useRouter } from "next/router";

interface CardsViewProps {}

const CardsView: FC<CardsViewProps> = () => {
	const router = useRouter();
	const { user, validateUser } = useAuthContext();
	const { language } = useLanguageContext();
	const userValidator = validateUser(
		toast.error,
		language?.generic?.notLoggedIn,
	);

	const [addCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);
	const [updateCardModalOpen, setUpdateCardModalOpen] =
		useState<boolean>(false);
	const [cards, setCards] = useState<Array<ICard | any>>([]);
	const [selectedCard, setSelectedCard] = useState<ICard | any>({});
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

	const getUserCards = () =>
		CardsService.getUserCards(user?.token)
			.then((res) => setCards(res))
			.catch((err) => toast.error(err?.toString()));

	const createCard = (data: any) => {
		if (!userValidator()) return;
		return CardsService.createCard(data, user?.token)
			.then(getUserCards)
			.catch((err) => toast.error(err?.message));
	};

	const updateCard = (data: FormData) => {
		const cardId = data.get("id")?.toString() as string;
		if (!userValidator()) return;
		return CardsService.updateCard(cardId, data, user?.token)
			.then(getUserCards)
			.catch((err) => toast.error(err?.message));
	};

	const deleteCard = (card: ICard) => {
		if (card.id && user?.token)
			return CardsService.destroyCard(card.id, user?.token)
				.then(getUserCards)
				.catch((err) => toast.error(err?.message));
	};

	useEffect(() => {
		if (user && !user?.token) router.push("/auth/login");
		if (user?.token) getUserCards();
	}, [user]);

	return (
		<>
			<ToastContainer />
			<h2>
				{replaceWithList(language?.generic?.welcome, [
					user?.user?.username,
				])}
			</h2>

			<DeleteDialog
				visible={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
				onDeleteItem={() => {
					selectedCard && deleteCard(selectedCard);
					setDeleteDialogOpen(false);
					setSelectedCard({});
				}}
				title={`${language?.generic?.wishDelete}: ${selectedCard?.title}`}
			/>

			<CardFormModal
				onClose={() => setAddCardModalOpen((prev) => !prev)}
				visible={addCardModalOpen}
				buttonText={language?.generic?.create}
				onSubmit={createCard}
				formTitle={language?.view?.cards?.createCard}
			/>

			<CardFormModal
				onClose={() => setUpdateCardModalOpen((prev) => !prev)}
				visible={updateCardModalOpen && selectedCard !== undefined}
				buttonText={language?.generic?.update}
				initialValues={selectedCard}
				onSubmit={updateCard}
				formTitle={language?.view?.cards?.updateCard}
			/>

			<FlexBox
				align="center"
				justify="flex-end"
				style={{ width: "90%", marginInline: "auto" }}
			>
				<IconButton
					style={{ padding: 10 }}
					onClick={() => setAddCardModalOpen((prev) => !prev)}
				>
					<Add />
				</IconButton>
			</FlexBox>

			<UserCardsList
				onDelete={(card) => {
					setSelectedCard(card);
					setDeleteDialogOpen(true);
				}}
				onUpdate={(card) => {
					setSelectedCard(card);
					setUpdateCardModalOpen(true);
				}}
				cards={cards}
			/>
		</>
	);
};

export default CardsView;
