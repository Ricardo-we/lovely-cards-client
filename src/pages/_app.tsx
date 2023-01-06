import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from "next/app";
import { Button } from "@mui/material";
import { Head } from "next/document";
import MainLayout from "../components/Layouts/MainLayout";
import { useAuthContext } from "../contexts/AuthContext";
import { useLanguageContext } from "../contexts/LanguageContext";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MainLayout>
			<Component {...pageProps} />
		</MainLayout>
	);
}
