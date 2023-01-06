import {
	DateTimePicker,
	DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { FC } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { TextField } from "@mui/material";

interface BDateTimePickerProps {
	onChange?: (name: string, value?: Date | string | null) => any;
	name?: string;
	value?: Date | string | null;
	label?: string;
	error?: string | any;
}

const BDateTimePicker: FC<BDateTimePickerProps> = ({
	onChange = (v) => {},
	value,
	name = "",
	error,
	...props
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DateTimePicker
				value={value}
				onChange={(value) => {
					onChange(name, value);
				}}
				renderInput={(params) => (
					<TextField
						error={error}
						style={{ margin: 16, minWidth: 180, maxWidth: 200 }}
						variant="standard"
						name={name}
						{...params}
					/>
				)}
				{...props}
			/>
		</LocalizationProvider>
	);
};

export default BDateTimePicker;
