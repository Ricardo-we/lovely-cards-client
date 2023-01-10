import { ToastContainer, toast } from "react-toastify";

import Head from "next/head";
import UserForm from "./components/UserForm";
import UsersService from "../../services/api/UsersService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();
	const { language } = useLanguageContext();
	const { user, setUser } = useAuthContext();

	const handleLogin = async (data: any) => {
		UsersService.login(data)
			.then((loggedInUser) => {
				setUser((prev: any) => ({ ...prev, ...loggedInUser }));
				router.push("/cards");
			})
			.catch((err) => toast.error(err?.toString()));
	};

	useEffect(() => {
		if (user && user?.token) router.push("/cards");
	}, [user]);

	return (
		<>
			<ToastContainer />
			<Head>
				<title>{language?.generic?.login}</title>
			</Head>

			<main>
				<UserForm
					onSubmit={handleLogin}
					buttonText={language?.generic?.login}
					isNewAccount={false}
					formTitle={language?.generic?.login}
				/>
			</main>
		</>
	);
}
