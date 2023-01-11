import BList, { BListItem } from "../../../components/BList";
import { FC, useEffect, useMemo, useState } from "react";

import ActionButtons from "../../../components/ActionButtons";
import BButton from "../../../components/Buttons/BButton";
import BCard from "../../../components/BCard";
import { ICard } from "../../../types/Card";
import KeyValueList from "../../../components/KeyValueList";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { cutSentence } from "../../../utils/generic/string.utils";
import { useAudio } from "../../../hooks/useAudio";
import { useLanguageContext } from "../../../contexts/LanguageContext";

interface CardListItemProps {
	card?: ICard;
	onUpdate?: (card: ICard) => any;
	onDelete?: (card: ICard) => any;
}

const UserCardListItem: FC<CardListItemProps> = ({
	card,
	onDelete,
	onUpdate,
}) => {
	const { toggleAudioActive, audioActive } = useAudio(card?.music);
	const { language } = useLanguageContext();

	return (
		<BCard
			header={card?.title ? cutSentence(card?.title, 3) : ""}
			style={{
				minWidth: "250px",
				maxWidth: "250px",
				margin: "10px",
				backgroundColor:
					card?.card_background_type === "color"
						? card?.card_background
						: "#fff",
				backgroundImage:
					card?.card_background_type === "image"
						? card?.card_background
						: undefined,
			}}
			topContent={
				<ActionButtons
					onDelete={() =>
						onDelete && card
							? onDelete(card)
							: console.warn("onDelete function not  defined")
					}
					onUpdate={() =>
						onUpdate && card
							? onUpdate(card)
							: console.warn("onUpdateFunction not defined")
					}
				>
					<BButton onClick={toggleAudioActive}>
						{audioActive ? <PauseIcon /> : <PlayArrowIcon />}
					</BButton>
				</ActionButtons>
			}
		>
			<BList>
				<KeyValueList
					keyName={language?.fields?.title}
					value={card?.title}
				/>

				<KeyValueList
					keyName={language?.generic?.backgroundType}
					value={
						card?.card_background_type
							? language?.generic?.card_background_types?.[
									card.card_background_type
							  ]
							: ""
					}
				/>

				<KeyValueList
					keyName={language?.fields?.cardType}
					value={
						card?.card_type
							? language?.generic?.card_types?.[card.card_type]
							: ""
					}
				/>
			</BList>
		</BCard>
	);
};

export default UserCardListItem;
