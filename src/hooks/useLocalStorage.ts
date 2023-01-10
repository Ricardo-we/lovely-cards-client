import { useEffect, useState } from "react";

import { safeJsonParse } from "../utils/generic/json.utils";

export function useLocalStorage<T>(key: string, initialValue?: T) {
    const [value, setValue] = useState<T | undefined>(initialValue);
    
    useEffect(() => {
        const stored = window.localStorage.getItem(key);
        if(safeJsonParse(stored)) setValue(safeJsonParse(stored))
        if(!stored && !value) setValue(initialValue);

        if(!localStorage.getItem(key) && !value) {
            localStorage.setItem(key, JSON.stringify(initialValue))
        }
    }, []);

    useEffect(() => { 
        if(value && JSON.stringify(value) !== JSON.stringify(initialValue)) 
            window.localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue] as const;
}

