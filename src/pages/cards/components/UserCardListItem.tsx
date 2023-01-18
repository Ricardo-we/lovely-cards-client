import BList, { BListItem } from "../../../components/BList";
import { FC, useEffect, useMemo, useState } from "react";

import { APP_CONFIG } from "../../../config/app-settings";
import ActionButtons from "../../../components/ActionButtons";
import BButton from "../../../components/Buttons/BButton";
import BCard from "../../../components/BCard";
import { ICard } from "../../../types/Card";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import KeyValueList from "../../../components/KeyValueList";
import Link from "next/link";
import LinkIcon from '@mui/icons-material/Link';
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { cutSentence } from "../../../utils/generic/string.utils";
import { useAudio } from "../../../hooks/useAudio";
import { useLanguageContext } from "../../../contexts/LanguageContext";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material";
import { useWindow } from "../../../hooks/useWindow";

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
	const router = useRouter();
	const window_ = useWindow()
	const { toggleAudioActive, audioActive } = useAudio(card?.music);
	const { language } = useLanguageContext();
	const { palette } = useTheme();

	const [isCopying, setIsCopying] = useState<boolean>(false);

	const handleCopyLink = (cardId: string | number) => {
		setIsCopying(true)
		if(typeof window_ !== "undefined")
			window_.navigator.clipboard.writeText(`${APP_CONFIG.CLIENT_URL}/card/${cardId}`);

		setTimeout(() => setIsCopying(false), 1300)
	}

	if (!card?.id) return null;
	return (
		<Link  onClick={e => e.stopPropagation()} href={`/cards/${card?.id}`} legacyBehavior passHref>
			<BCard
				onClick={(e) => {
					e.stopPropagation();
				}}
				header={card?.title ? cutSentence(card?.title, 3) : ""}
				sx={{
					":hover": {
						backgroundColor: "#fff",
						opacity: "80%",
					},
					cursor: "pointer",
					transition: "500ms",
				}}
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
						onUpdateProps={{title: language?.generic?.edit}}
						onDeleteProps={{title: language?.generic?.delete}}
					>
						<BButton
							variant="contained"
							color="primary"
							title={language?.generic?.checkCardContents}
							onClick={() => router.push(`/cards/${card.id}`)}
						>
							<ImportContactsIcon />
						</BButton>

						<BButton
							variant="contained"
							color="info"
							onClick={toggleAudioActive}
							title={language?.generic?.playMusic}
						>
							{audioActive ? <PauseIcon /> : <PlayArrowIcon />}
						</BButton>
						
						<BButton
							variant="contained"
							color="success"
							title={language?.generic?.copy}
							onClick={() => handleCopyLink(card?.id)}
						>
							{isCopying ? language?.generic?.copied : <LinkIcon/>}
						</BButton>

						<BButton
							variant="contained"
							color="secondary"
							title={language?.generic?.checkDetails}
							onClick={() => router.push(`/card/${card.id}`)}
						>
							<VisibilityIcon />
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
								? language?.generic?.card_types?.[
										card.card_type
								  ]
								: ""
						}
					/>
				</BList>
			</BCard>
		</Link>
	);
};

export default UserCardListItem;
