import { FC, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import BColorPicker from "../../../components/fields/BColorPicker";
import BFilePicker from "../../../components/fields/BFilePicker";
import BInput from "../../../components/fields/BInput";
import BModal from "../../../components/BModal";
import BSelect from "../../../components/fields/BSelect";
import BSwitch from "../../../components/fields/BSwitch";
import BaseForm from "../../../components/BaseForm";
import { Helper } from "../../../types/Helpers";
import HelperService from "../../../services/api/HelperService";
import { ICard } from "../../../types/Card";
import { parseJsonToFormData } from "../../../utils/generic/form.utils";
import { useFormik } from "formik";
import { useLanguageContext } from "../../../contexts/LanguageContext";
import { useReactiveFormik } from "../../../hooks/useReactiveFormik";

interface CardFormModalProps {
	visible?: boolean;
	onClose?: () => any;
	onSubmit?: (data?: FormData | any) => any;
	initialValues?: ICard;
	buttonText?: string;
	formTitle?: string;
}

const PLAIN_CARD_DATA = {
	music: null,
	card_background: "#fff",
	title: "",
	card_background_type: "color",
	card_type: "flip",
	auto_play: false
};
const CARD_TYPES_CATEGORIE_NAME = "card_types";
const CARD_BACKGROUND_TYPES_NAME = "card_background_types";

const CardFormModal: FC<CardFormModalProps> = ({
	onSubmit,
	onClose,
	visible = false,
	initialValues = PLAIN_CARD_DATA,
	buttonText = "",
	formTitle = "",
}) => {
	const { languageCode, language } = useLanguageContext();
	const [cardTypes, setCardTypes] = useState<Helper[]>([]);
	const [cardBackgroundTypes, setCardBackgroundTypes] = useState<Helper[]>(
		[],
	);

	const getCardTypes = () => {
		Promise.all([
			HelperService.findHelpersByCategorieName(
				CARD_TYPES_CATEGORIE_NAME,
				languageCode,
			),
			HelperService.findHelpersByCategorieName(
				CARD_BACKGROUND_TYPES_NAME,
				languageCode,
			),
		])

			.then(([cardTypes, cardBackgroundTypes]) => {
				setCardTypes(cardTypes);
				setCardBackgroundTypes(cardBackgroundTypes);
			})
			.catch((err) => toast.error(err?.message));
	};

	const handleSubmit = (data?: any) => {
		const formData = parseJsonToFormData(data);
		onSubmit && onSubmit(formData);
	};

	const formik = useReactiveFormik(
		{
			initialValues,
			onSubmit: handleSubmit,
		},
		initialValues,
	);

	useEffect(() => {
		getCardTypes();
	}, []);

	return (
		<>
			<ToastContainer />
			<BModal
				style={{ backgroundColor: formik.values?.card_background }}
				visible={visible}
				onClose={() => onClose && onClose()}
			>
				<BaseForm
					onSubmit={formik.submitForm}
					buttonText={buttonText}
					title={formTitle}
				>
					<BInput
						name="title"
						onChange={formik.handleChange}
						error={formik.errors.title}
						label={language?.fields?.title}
						value={formik.values.title}
					/>
					<BColorPicker
						onChange={(value) =>
							formik.setFieldValue("card_background", value)
						}
						value={formik.values.card_background}
						label={language?.fields?.background}
					/>

					<BFilePicker
						label={language?.fields?.music}
						onChange={(data) => formik.setFieldValue("music", data)}
						value={formik.values?.music}
						error={formik.errors?.music}
						accept={[".mp3", ".aif", ".wav", ".ogg", ".wma"]}
						// type="file"
					/>

					<BSelect
						name="card_type"
						label={language?.fields?.cardType}
						value={formik.values?.card_type}
						onChange={formik.handleChange}
						error={formik.errors?.card_type}
						items={cardTypes?.map((cardType) => ({
							label: cardType.name,
							value: cardType.code,
						}))}
					/>

					<BSwitch
						label={language?.fields?.autoPlay}
						onChange={(e) =>
							formik.setFieldValue("auto_play", e.target.checked)
						}
						checked={formik.values?.auto_play}
					/>

					{/*** @FUTURE @VERSIONS */}
					{/* <BSelect
						label={language?.fields?.backgroundType}
						name="card_background_type"
						value={formik.values?.card_background_type}
						onChange={formik.handleChange}
						items={cardBackgroundTypes?.map((bgType) => ({
							label: bgType.name,
							value: bgType.code,
						}))}
						error={formik.errors?.card_background_type}
					/> */}
				</BaseForm>
			</BModal>
		</>
	);
};

export default CardFormModal;
