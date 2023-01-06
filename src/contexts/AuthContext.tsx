import { FullUser, IUser } from "../types/User";
import { createContext, useContext, useEffect, useState } from "react";

import { APP_CONFIG } from "../config/app-settings";
import { generateStorageKey } from "../utils/generic/storage.utils";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextProps {
	children: JSX.Element;
}

interface AuthContextValue {
	user: FullUser | any;
	setUser: (value: any) => any;
	confirmationCodeValues: any;
	setConfirmationCodeValues: (value: any) => any;
}

export const AuthContext = createContext<AuthContextValue | any>({});

export function AuthProvider({ children }: AuthContextProps) {
	const [user, setUser] = useLocalStorage<FullUser>(
		generateStorageKey("user"),
		{} as FullUser,
	);
	const [confirmationCodeValues, setConfirmationCodeValues] = useState<{
		user_code?: string;
		user_id?: number;
	}>({});

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				confirmationCodeValues,
				setConfirmationCodeValues,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuthContext = () => {
	const ctx = useContext<FullUser | object | undefined | any>(AuthContext);
	const authContextResult: AuthContextValue = {
		user: ctx?.user,
		setUser: ctx?.setUser,
		confirmationCodeValues: ctx?.confirmationCodeValues,
		setConfirmationCodeValues: ctx?.setConfirmationCodeValues,
	};
	return authContextResult;
};
