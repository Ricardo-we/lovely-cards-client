import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FC } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { TextField } from "@mui/material";

interface BDatePickerProps {
	onChange?: (name: string, value?: Date | string | null) => any;
	name?: string;
	value?: Date | string | null;
	label?: string;
	error?: string | any;
}

const BDatePicker: FC<BDatePickerProps> = ({
	onChange = (v) => {},
	value,
	name = "",
	error,
	...props
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DatePicker
				value={value}
				onChange={(value) => {
					onChange(name, value);
				}}
				renderInput={(params) => (
					<TextField
						variant="standard"
						style={{ margin: 16, minWidth: 180, maxWidth: 200, }}
						error={error}
						name={name}
						{...params}
					/>
				)}
				{...props}
			/>
		</LocalizationProvider>
	);
};

export default BDatePicker;
