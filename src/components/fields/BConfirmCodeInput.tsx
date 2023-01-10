import { FormControl, InputLabel } from "@mui/material";
import ReactCodeInput, { ReactCodeInputProps } from "react-code-input";

import { FC } from "react";

interface BConfirmCodeInputProps extends ReactCodeInputProps {
    onChange?: (value: string) => any;
    label?: string;
}

const BConfirmCodeInput: FC<BConfirmCodeInputProps> = ({ label, onChange, ...props }) => {
	return (
		<FormControl>
			<InputLabel>{label}</InputLabel>
			<ReactCodeInput
                {...props}
				onChange={(value) => onChange && onChange(value)}
			/>
		</FormControl>
	);
};

export default BConfirmCodeInput;
