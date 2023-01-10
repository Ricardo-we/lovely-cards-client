import { FC, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import BInput from "../../../components/fields/BInput";
import BSelect from "../../../components/fields/BSelect";
import BaseForm from "../../../components/BaseForm";
import { Helper } from "../../../types/Helpers";
import HelperService from "../../../services/api/HelperService";
import { useFormik } from "formik";
import { useLanguageContext } from "../../../contexts/LanguageContext";
import { userSchema } from "../feature-services/userSchema";

interface UserFormProps {
	onSubmit?: (data: any) => any;
	buttonText?: string;
	formTitle?: string;
	isNewAccount?: boolean;
}

const UserForm: FC<UserFormProps> = ({
	onSubmit = (data) => {},
	formTitle,
	buttonText,
	isNewAccount = true,
}) => {
	const { language } = useLanguageContext();
	const [availableLanguages, setAvailableLanguages] = useState<Helper[]>([]);

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			language_id: "",
			password: "",
		},
		onSubmit: (data) => {
			onSubmit && onSubmit(data);
		},
		validationSchema: userSchema(language),
	});

	const getAvailableLanguages = () =>
		HelperService.findHelpersByCategorieName("languages")
			.then((data) => setAvailableLanguages(data))
			.catch((err) => toast.error(err));

	useEffect(() => {
		getAvailableLanguages();
	}, []);

	return (
		<>
			<ToastContainer />
			<BaseForm
				style={{marginTop: "150px"}}
				onSubmit={formik.submitForm}
				title={formTitle}
				buttonText={buttonText}
			>
				<BInput
					name="username"
					onChange={formik.handleChange}
					error={formik.errors.username}
					label={language?.fields?.username}
					value={formik.values.username}
				/>
				<BInput
					name="email"
					onChange={formik.handleChange}
					error={formik.errors.email}
					label={language?.fields?.email}
					value={formik.values.email}
				/>
				<BInput
					name="password"
					onChange={formik.handleChange}
					error={formik.errors.password}
					label={language?.fields?.password}
					value={formik.values.password}
					type="password"
				/>

				{isNewAccount ? (
					<BSelect
						name="language_id"
						error={formik.errors.language_id}
						onChange={formik.handleChange}
						items={availableLanguages?.map((language) => ({
							value: language?.id,
							label: language?.name,
						}))}
						label={language?.fields?.language}
					/>
				) : <></>}
			</BaseForm>
		</>
	);
};

export default UserForm;
