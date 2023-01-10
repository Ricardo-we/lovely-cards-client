import { useEffect, useState } from "react";

export function useWindow(){
    const [windowObj, setWinObj] = useState<Window>();

    useEffect(() => {
        setWinObj(window);
    }, [])

    return windowObj;
}