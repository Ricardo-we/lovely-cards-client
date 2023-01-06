import { useEffect, useState } from "react";

import { safeJsonParse } from "../utils/generic/json.utils";

export function useLocalStorage<T>(key: string, fallbackValue?: T) {
    const [value, setValue] = useState<T | undefined>(fallbackValue);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        if(!value && stored) setValue(safeJsonParse(stored))
    }, [fallbackValue, key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}

