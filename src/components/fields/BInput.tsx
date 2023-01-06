import { CSSProperties, FC } from "react";
import { InputProps, StandardTextFieldProps, TextField, TextFieldProps } from "@mui/material";
import { getISODate, getISODateTime } from "../../utils/generic/date.utils";

interface BInputProps extends StandardTextFieldProps {
	error?: any;
	name?: string;
	value?: any;
	// variant?: "filled" | "standard" | "outlined";
	onChange?: (data: any) => any;
	style?: CSSProperties;
	type?: string;
	label: string;
	rows?: number;
	multiline?: boolean;
	maxRows?: number;
	disabled?: boolean;
	autoFocus?: boolean
}

const BInput: FC<BInputProps> = ({
	error = "",
	name = "",
	onChange,
	value,
	variant = "standard",
	disabled = false,
	...props
}) => {
	const hasError = error?.length > 0;
	const isTypeDate = ["date", "datetime", "time"].includes(props?.type || "");

	return (
		<TextField
			helperText={error}
			variant={variant}
			error={hasError}
			name={name}
			onChange={onChange}
			value={isTypeDate? getISODate(value) : value}
			style={{ margin: 16, width: "100%", ...props.style }}
			InputLabelProps={{
				shrink: isTypeDate ? true : undefined,
			}}
			disabled={disabled}
			{...props}
		/>
	);
};

export default BInput;
