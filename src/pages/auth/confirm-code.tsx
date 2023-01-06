import { FC, useEffect, useState } from "react";
import { FormControl, InputLabel } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import BButton from "../../components/Buttons/BButton";
import BConfirmCodeInput from "../../components/fields/BConfirmCodeInput";
import FlexBox from "../../components/FlexBox";
import UsersService from "../../services/api/UsersService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { useRouter } from "next/router";

interface ConfirmCodeProps {}

const ConfirmCode: FC<ConfirmCodeProps> = () => {
	const router = useRouter();
	const { language } = useLanguageContext();
	const { confirmationCodeValues, setConfirmationCodeValues, setUser } =
		useAuthContext();
	const [userCode, setUserCode] = useState<string>("");

	const confirmUserCode = (user_code: string, user_id: number) => {
		return UsersService.confirmUser(user_id, user_code)
			.then((res) => setUser(res))
			.catch((err) => toast.error(err.toString()));
	};

	useEffect(() => {
		if (!confirmationCodeValues?.user_id) router.back();
	}, [{ ...confirmationCodeValues }]);

	return (
		<>
			<ToastContainer />
			<FlexBox direction="column" align="center" justify="space-between" style={{marginTop: "200px"}}>
				<h2>{language.generic.confirmCode}</h2>
				<BConfirmCodeInput
					name="confirmCode"
					inputMode="numeric"
					label={language?.generic?.confirmCode}
					onChange={(value) => setUserCode(value)}
				/>

				<BButton
					onClick={() => {
						confirmUserCode(
							userCode,
							confirmationCodeValues.user_id,
						);
					}}
				>
					{language?.generic?.confirm}
				</BButton>
			</FlexBox>
		</>
	);
};

export default ConfirmCode;
