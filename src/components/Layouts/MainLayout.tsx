import { FC } from "react";
import MainProviders from "./MainProviders";
import Navbar from "../Navbar";
import { mainTheme } from "../../styles/themes/main";
import { useAuthContext } from "../../contexts/AuthContext";

interface MainLayoutProps {
	children: JSX.Element | JSX.Element[] | string;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	const { user } = useAuthContext();

	return (
		<MainProviders theme={user?.theme || mainTheme}>
			<>
				<Navbar/>
				{children}
			</>
		</MainProviders>
	);
};

export default MainLayout;
