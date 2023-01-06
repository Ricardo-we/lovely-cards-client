import "./Navbar.module.css";

import {
	AppBar,
	Box,
	Container,
	Drawer,
	IconButton,
	ListItemButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import BList, { BListItem, BListItemButton } from "../BList";
import { FC, useState } from "react";

import { APP_CONFIG } from "../../config/app-settings";
import BButton from "../Buttons/BButton";
import BLink from "../BLink";
import MenuIcon from "@mui/icons-material/Menu";
import { NextNavRoute } from "../../types/NextNavRoute";
import { firstLetterUpperCase } from "../../utils/generic/string.utils";
import { mainLayoutRoutes } from "../../config/routes/navbar-main-layout.routes";
import { useLanguageContext } from "../../contexts/LanguageContext";

interface NavbarProps {
	routeList?: NextNavRoute[];
}

const NavBarLink = ({
	children,
	to,
}: {
	children: JSX.Element | string;
	to: string;
}) => (
	<BListItem
		sx={{
			":hover": { backgroundColor: "#39393928" },
			transition: "500ms",
			padding: 1,
		}}
	>
		<BLink
			style={{ height: "100%", width: "100%" }}
			className="main-navbar-link"
			to={to}
		>
			{children}
		</BLink>
	</BListItem>
);

const AppBarWrapper = ({ children }: any) => {
	return (
		<AppBar variant="elevation" position="relative">
			<Container maxWidth="xl">
				<Toolbar disableGutters>{children}</Toolbar>
			</Container>
		</AppBar>
	);
};

const Navbar: FC<NavbarProps> = ({  }) => {
	const [navbarOpen, setNavBarOpen] = useState<boolean>(false);
	const { language } = useLanguageContext();
	const routeList = mainLayoutRoutes(language);

	return (
		<AppBarWrapper>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				color="inherit"
				onClick={() => setNavBarOpen((prev) => !prev)}
			>
				<MenuIcon />
			</IconButton>

			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
				{APP_CONFIG.appName.toUpperCase()}
			</Typography>

			<Drawer
				anchor="left"
				open={navbarOpen}
				onClose={() => setNavBarOpen(false)}
			>
				<Typography variant="h4">
					{firstLetterUpperCase(APP_CONFIG.appName)}
				</Typography>
				
				<BList sx={{ minWidth: 300 }}>
					{routeList?.map((route, index) => (
						<NavBarLink key={index} to={route.route}>{route.label}</NavBarLink>
					))}
				</BList>
			</Drawer>
		</AppBarWrapper>
	);
};

export default Navbar;
