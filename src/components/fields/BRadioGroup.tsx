import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	RadioGroupProps,
} from "@mui/material";

import { FC } from "react";

interface BRadioGroupProps extends RadioGroupProps{
	options?: string[];
	onChange?: (e: any) => any;
	label?: string;
	value?: any;
	row?: boolean;
	containerStyle?: any;
}

/***
 * @options string, is possible to use this syntax "Label:value" or "value" if you just use the value is gonna use it as label
 * @type "radio" | "checkbox" | "range"
 * @onChange onChange function
 */
const BRadioGroup: FC<BRadioGroupProps> = ({
	options,
	onChange,
	label,
	value,
	row=true,
	containerStyle,
	...props
}) => {
	return (
		<FormControl style={containerStyle}>
			<FormLabel id="demo-controlled-radio-buttons-group">
				{label}
			</FormLabel>
			<RadioGroup
				aria-labelledby="demo-controlled-radio-buttons-group"
				name="controlled-radio-buttons-group"
				value={value}
				row={row}
				onChange={onChange}
				{...props}
			>
				{options?.map((option, index) => {
					const label = option.includes(":")
						? option.split(":")[0]
						: option;
					const value = option.includes(":")
						? option.split(":")[1]
						: option;

					return (
						<FormControlLabel
							key={index}
							value={value}
							control={<Radio />}
							label={label}
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
};

export default BRadioGroup;
