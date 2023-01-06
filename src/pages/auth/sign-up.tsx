import BConfirmCodeInput from "../../components/fields/BConfirmCodeInput";
import BLink from "../../components/BLink";
import FlexBox from "../../components/FlexBox";
import Head from "next/head";
import HelperService from "../../services/api/HelperService";
import { IUser } from "../../types/User";
import UserForm from "./components/UserForm";
import UsersService from "../../services/api/UsersService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();
	const { language } = useLanguageContext();
	const { user, confirmationCodeValues, setConfirmationCodeValues } =
		useAuthContext();

	const handleUserCreate = async (data: any) => {
		const response = await UsersService.createUser(data as IUser);
		setConfirmationCodeValues({user_id: response?.user_id});
		router.push("/auth/confirm-code");
	};

	useEffect(() => {
		if(confirmationCodeValues?.user_id && !user) router.push("/auth/confirm-code");
	}, [confirmationCodeValues])

	return (
		<main>
			<FlexBox>
				<UserForm
					onSubmit={handleUserCreate}
					buttonText={language?.generic?.create}
					formTitle={language.view?.auth?.sign_up?.createFormTitle}
				/>
			</FlexBox>
		</main>
	);
}
