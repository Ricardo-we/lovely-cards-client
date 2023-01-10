import { FC, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Add } from "@mui/icons-material";
import CardFormModal from "./components/CardFormModal";
import CardsService from "../../services/api/CardsService";
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
	const { user } = useAuthContext();
	const { language } = useLanguageContext();
	const [addCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);
	const [cards, setCards] = useState<Array<ICard | any>>([]);

	const getUserCards = () =>
		CardsService.getUserCards(user?.token)
			.then((res) => setCards(res))
			.catch((err) => toast.error(err?.toString()));

	const createCard = (data: any) => {
        if(!user?.token) return toast.error(language?.generic?.notLoggedIn);
		return CardsService.createCard(data, user?.token)
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

			<CardFormModal
				onClose={() => setAddCardModalOpen((prev) => !prev)}
				visible={addCardModalOpen}
				buttonText={language?.generic?.create}
				onSubmit={createCard}
				formTitle={language?.view?.cards?.createCard}
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

			<UserCardsList cards={cards} />
		</>
	);
};

export default CardsView;
