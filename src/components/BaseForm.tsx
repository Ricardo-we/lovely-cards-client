import * as yup from "yup";

import {
	Box,
	Button,
	CircularProgress,
	Color,
	Typography,
} from "@mui/material";
import { CSSProperties, FC } from "react";

import FlexBox from "./FlexBox";

export type colors =
	| "primary"
	| "secondary"
	| "error"
	| "warning"
	| "info"
	| "success";

interface BaseFormProps {
	onSubmit?: (data: any) => any;
	children?: JSX.Element | JSX.Element[];
	// initialValues: object;
	validationSchema?: yup.AnySchema;
	spinnerColor?: colors;
	buttonText?: string;
	isSubmitting?: boolean;
	style?: CSSProperties;
	className?: string;
	hideButton?: boolean;
	title?: string;
}

const BaseForm: FC<BaseFormProps> = ({
	onSubmit,
	children,
	// initialValues,
	spinnerColor = "primary",
	isSubmitting,
	style,
	className,
	hideButton = false,
	title,
	...props
}) => {
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (onSubmit) onSubmit(e);
	};

	return (
		<form
			style={{ width: "80%", height: "100%", marginBlock: "10px", marginInline: "auto", ...style }}
			className={className}
			onSubmit={handleSubmit}
		>
			<Typography
				style={{ textAlign: "center", width: "100%" }}
				variant="h4"
			>
				{title}
			</Typography>
			<FlexBox
				style={{ width: "100%" }}
				align="center"
				justify="space-evenly"
			>
				{children}
			</FlexBox>
			{!hideButton &&
				(isSubmitting ? (
					<CircularProgress color={spinnerColor} />
				) : (
					<Button
						variant="contained"
						type="submit"
						color="info"
						style={{ marginTop: 10, width: "100%" }}
					>
						{props?.buttonText}
					</Button>
				))}
		</form>
	);
};

export default BaseForm;
