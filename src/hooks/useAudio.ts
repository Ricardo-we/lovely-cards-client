import { useEffect, useMemo, useState } from "react";

export function useAudio(audioSrc?: string){
    const [audioActive, setAudioActive] = useState<boolean>(false);
    const audioPlayer = useMemo(() => new Audio(audioSrc), [audioSrc]);

    const toggleAudioActive = () => {
        setAudioActive(prev => !prev);
        
    }
    
    useEffect(() => {
        if(audioActive) audioPlayer.play();
        else audioPlayer.pause();

        return () => {
            audioPlayer.pause();
        }
    }, [audioActive])

    return {toggleAudioActive, setAudioActive, audioActive, audioPlayer};

}