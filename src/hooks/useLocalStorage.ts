import { useEffect, useState } from "react";

import { safeJsonParse } from "../utils/generic/json.utils";

export function useLocalStorage<T>(key: string, fallbackValue?: T) {
    const [value, setValue] = useState<T | undefined>(fallbackValue);

    useEffect(() => {
        console.log("OOPS")
        const stored = localStorage.getItem(key);
        if(!value && stored || stored !== JSON.stringify(value)) setValue(safeJsonParse(stored))
    }, [fallbackValue, key]);

    useEffect(() => {
        console.log("OOPS 2")
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}

