import { AuthProvider, useAuthContext } from "../../contexts/AuthContext";
import { Theme, ThemeProvider } from "@mui/material";

import { FC } from "react";
import { LanguageProvider } from "../../contexts/LanguageContext";

interface MainProvidersProps {
	children: JSX.Element | JSX.Element[] | string;
	theme: Theme;
}

const MainProviders: FC<MainProvidersProps> = ({ theme, children }) => {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<LanguageProvider>{children}</LanguageProvider>
			</AuthProvider>
		</ThemeProvider>
	);
};

export default MainProviders;
