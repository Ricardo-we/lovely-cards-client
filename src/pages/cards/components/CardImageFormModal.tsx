import { FC, useState } from "react";
import { FormikHelpers, FormikValues } from "formik";
import {
	cardImageWithFileSchema,
	cardImageWithUrlSchema,
} from "../feature-services/cardImageSchema";

import BFilePicker from "../../../components/fields/BFilePicker";
import BInput from "../../../components/fields/BInput";
import BModal from "../../../components/BModal";
import BSwitch from "../../../components/fields/BSwitch";
import BaseForm from "../../../components/BaseForm";
import { ICardImage } from "../../../types/Card";
import { useLanguageContext } from "../../../contexts/LanguageContext";
import { useReactiveFormik } from "../../../hooks/useReactiveFormik";

interface CardImageFormModalProps {
	initialValues?: object;
	visible?: boolean;
	resetOnSubmit?: boolean;
	onClose?: () => any;
	onSubmit?: (data?: ICardImage) => any;
	formTitle?: string;
	buttonText?: string;
}

const PLAIN_CARD_IMAGE = {
	card_id: null,
	image_url: "https://picsum.photos/400/400?grayscale",
	image: null,
};

const CardImageFormModal: FC<CardImageFormModalProps> = ({
	initialValues = PLAIN_CARD_IMAGE,
	visible = false,
	onClose,
	onSubmit,
	resetOnSubmit,
	formTitle,
	buttonText,
}) => {
	const { language } = useLanguageContext();

	const [isUrl, setIsUrl] = useState<boolean>(false);

	const handleSubmit = async (
		data: any,
		formikHelpers: FormikHelpers<any>,
	) => {
		const formattedData: any = {};
		if (isUrl) formattedData.image_url = data?.image_url;
		else if (!isUrl && data?.image) formattedData.image = data?.image;

		onSubmit && (await onSubmit(formattedData));
		formikHelpers.setSubmitting(false);
        if(resetOnSubmit) formik.resetForm();
	};

	const formik = useReactiveFormik(
		{
			initialValues: initialValues,
			onSubmit: handleSubmit,
			validationSchema: isUrl
				? cardImageWithUrlSchema(language)
				: cardImageWithFileSchema(language),
		},
		initialValues,
	);

	return (
		<BModal visible={visible} onClose={() => onClose && onClose()}>
			<BaseForm
				title={formTitle}
				buttonText={buttonText}
				isSubmitting={formik.isSubmitting}
				onSubmit={() => {
					formik.submitForm();
				}}
			>
				{isUrl ? (
					<BInput
						name="image_url"
						label={language?.fields?.imageUrl}
						onChange={formik.handleChange}
						value={formik.values?.image_url}
						error={formik.errors?.image_url}
					/>
				) : (
					<BFilePicker
						onChange={(value) =>
							formik.setFieldValue("image", value)
						}
						value={formik.values?.image}
						error={formik.errors?.image}
						label={language?.fields?.image}
						accept={[".png", ".jpg", ".gif", ".svg"]}
					/>
				)}

				<BSwitch
					label={language?.fields?.isUrl}
					onChange={(e) => setIsUrl(e.target.checked)}
					checked={isUrl}
				/>
			</BaseForm>
		</BModal>
	);
};

export default CardImageFormModal;
