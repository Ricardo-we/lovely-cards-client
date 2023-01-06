import { FullUser, IUser } from "../types/User";
import { createContext, useContext, useEffect, useState } from "react";

import { APP_CONFIG } from "../config/app-settings";
import { LanguageService } from "../services/api/LanguageService";
import LanguageTranslationJson from "../types/LanguageTranslationJson";
import { generateStorageKey } from "../utils/generic/storage.utils";
import { useAuthContext } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface LanguageContextProps {
	children: JSX.Element | JSX.Element[] | string;
}

interface LanguageContextValues {
	language?: LanguageTranslationJson | object;
	setLanguage: (data: any) => any;
}

export const LanguageContext = createContext<object | any>({});

export function LanguageProvider({ children }: LanguageContextProps) {
	const [languageCode, setLanguageCode] = useLocalStorage<string>(
		generateStorageKey("languageCode"),
	);
	const [language, setLanguage] = useLocalStorage<object | any>(
		generateStorageKey("languageObj"),
		LanguageService.getLanguage(languageCode),
	);
	const { user } = useAuthContext();

	useEffect(() => {
		if (!language) setLanguage(LanguageService.getLanguage(languageCode));
	}, [languageCode, user?.language]);

	useEffect(() => {
		if (
			!languageCode ||
			(user?.language?.code && user?.language?.code !== languageCode)
		)
			setLanguageCode(user?.language?.code ?? navigator.languages[1]);
	}, []);

	return (
		<LanguageContext.Provider
			value={{ language, setLanguage, languageCode, setLanguageCode }}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export const useLanguageContext = () => {
	const context = useContext<LanguageContextValues>(LanguageContext);
	return context as LanguageContextValues | any;
};
