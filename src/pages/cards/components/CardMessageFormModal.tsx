import BColorPicker from "../../../components/fields/BColorPicker";
import BInput from "../../../components/fields/BInput";
import BModal from "../../../components/BModal";
import BaseForm from "../../../components/BaseForm";
import { FC } from "react";
import { FormikHelpers } from "formik";
import { ICardMessage } from "../../../types/Card";
import { cardMessageSchema } from "../feature-services/cardMessageSchema";
import { useLanguageContext } from "../../../contexts/LanguageContext";
import { useReactiveFormik } from "../../../hooks/useReactiveFormik";

interface CardMessageFormModalProps {
	initialValues?: object;
	visible?: boolean;
	resetOnSubmit?: boolean;
	onClose?: () => any;
	onSubmit?: (data?: ICardMessage) => any;
	formTitle?: string;
	buttonText?: string;
}

const PLAIN_CARD_MESSAGE = {
	heading: "",
	content: "",
	color: "#fff",
	card_id: null,
};

const CardMessageFormModal: FC<CardMessageFormModalProps> = ({
	initialValues = PLAIN_CARD_MESSAGE,
	onSubmit,
	onClose,
	visible = false,
	resetOnSubmit,
	formTitle,
	buttonText,
}) => {
	const { language } = useLanguageContext();

	const handleSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
		formikHelpers.setSubmitting(true);
		onSubmit && await onSubmit(values);
		formikHelpers.setSubmitting(false);
		resetOnSubmit && formikHelpers.resetForm();
	};

	const formik = useReactiveFormik<ICardMessage>(
		{
			initialValues,
			onSubmit: handleSubmit,
			validationSchema: cardMessageSchema(language)
		},
		initialValues,
	);

	return (
		<BModal style={{ backgroundColor: formik.values?.color }} visible={visible} onClose={() => onClose && onClose()}>
			<BaseForm
				onSubmit={formik.submitForm}
				buttonText={buttonText}
				title={formTitle}
				isSubmitting={formik.isSubmitting}
			>
				<BInput
					name="heading"
					onChange={formik.handleChange}
					error={formik.errors.heading}
					label={language?.fields?.heading}
					value={formik.values.heading}
				/>


				<BInput
					name="content"
					onChange={formik.handleChange}
					error={formik.errors.content}
					label={language?.fields?.content}
					value={formik.values.content}
					multiline
					sx={{minWidth: "100px"}}
				/>

				<BColorPicker
					onChange={(color) => formik.setFieldValue("color",color)}
					label={language?.fields?.color}
					value={formik?.values?.color}
				/>
			</BaseForm>
		</BModal>
	);
};

export default CardMessageFormModal;
