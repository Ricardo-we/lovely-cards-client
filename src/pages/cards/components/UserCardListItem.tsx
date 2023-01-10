import BList, { BListItem } from "../../../components/BList";
import { FC, useEffect, useMemo, useState } from "react";

import BButton from "../../../components/Buttons/BButton";
import BCard from "../../../components/BCard";
import { ICard } from "../../../types/Card";
import KeyValueList from "../../../components/KeyValueList";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAudio } from "../../../hooks/useAudio";
import { useLanguageContext } from "../../../contexts/LanguageContext";

interface CardListItemProps {
    card?: ICard;    
}
 
const UserCardListItem: FC<CardListItemProps> = ({ card }) => {
    const { toggleAudioActive, audioActive } = useAudio(card?.music);
    const { language } = useLanguageContext();

    return ( 
        <BCard
            header={card?.title}
            style={{ 
                minWidth: "200px", 
                backgroundColor: card?.card_background_type === "color" ? card?.card_background : "#fff",
                backgroundImage: card?.card_background_type === "image" ? card?.card_background : undefined
            }}
            topContent={<>
                <BButton onClick={toggleAudioActive}> 
                    {audioActive ? <PauseIcon/> : <PlayArrowIcon/>}
                </BButton>
            </>}      
        >
            <BList>
                <KeyValueList
                    keyName={language?.generic?.backgroundType}
                    value={card?.card_background_type}
                />
                    {/* {card.card_background_type ==="image"} */}
               
            </BList>
        </BCard>
    );
}
 
export default UserCardListItem;