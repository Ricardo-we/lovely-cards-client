import { useEffect, useMemo, useState } from "react";

export function useAudio(audioSrc?: string){
    const [audioActive, setAudioActive] = useState<boolean>(false);
    const [audioPlayer, setAudioPlayer] = useState<any>(typeof Audio !== "undefined" ? new Audio(audioSrc) : null);

    const toggleAudioActive = () => {
        setAudioActive(prev => !prev);
    }

    useEffect(() => {
        if(!audioPlayer) setAudioPlayer(new Audio(audioSrc))
        if(audioPlayer !== null) audioPlayer.src = audioSrc;
    }, [audioSrc])
    
    useEffect(() => {
        if(!audioPlayer) return
        if(audioActive) audioPlayer.play();
        else audioPlayer.pause();

        return () => {
            audioPlayer.pause();
        }
    }, [audioActive])

    return {toggleAudioActive, setAudioActive, audioActive, audioPlayer};

}