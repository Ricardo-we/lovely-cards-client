import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import BackdropLoader from "../components/BackdropLoader";
import { Button } from "@mui/material";
import { Head } from "next/document";
import MainLayout from "../components/Layouts/MainLayout";
import { useAuthContext } from "../contexts/AuthContext";
import { useLanguageContext } from "../contexts/LanguageContext";
import { useRouter } from "next/router";

const Loader = ({ children }: { children: JSX.Element }): JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	const handleLoadingStart = (url: string) =>
		url !== router.asPath && setIsLoading(true);
	const handleLoadingComplete = (url: string) => setIsLoading(false);

	useEffect(() => {
		router.events.on("routeChangeStart", handleLoadingStart);
		router.events.on("routeChangeComplete", handleLoadingComplete);
		router.events.on("routeChangeError", handleLoadingComplete);

		return () => {
			router.events.off("routeChangeStart", handleLoadingStart);
			router.events.off("routeChangeComplete", handleLoadingComplete);
			router.events.off("routeChangeError", handleLoadingComplete);
		};
	}, []);

	return isLoading ? <BackdropLoader /> : <>{children}</>;
};


export default function App({ Component, pageProps }: AppProps) {
	return (
		<MainLayout>
			<Loader>
				<Component {...pageProps} />
			</Loader>
		</MainLayout>
	);
}
