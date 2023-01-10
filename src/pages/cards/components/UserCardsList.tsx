import { FC, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import CardsService from "../../../services/api/CardsService";
import FlexBox from "../../../components/FlexBox";
import { ICard } from "../../../types/Card";
import UserCardListItem from "./UserCardListItem";
import { replaceWithList } from "../../../utils/generic/string.utils";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useLanguageContext } from "../../../contexts/LanguageContext";
import { useRouter } from "next/router";

interface UserCardsListProps {
	cards?: ICard[];
}

const UserCardsList: FC<UserCardsListProps> = ({ cards }) => {
	const { language } = useLanguageContext();

	return (
		<>
			<ToastContainer />
			<FlexBox style={{width: "80%", marginInline: "auto"}} direction="row" justify="space-evenly" align="center">
				{cards && cards?.length > 0 ? (
					cards?.map((card: ICard | any, index: number) => (
						<UserCardListItem card={card} key={index} />
					))
				) : (
					<h2>{language?.generic?.noContent}</h2>
				)}
			</FlexBox>
		</>
	);
};

export default UserCardsList;
