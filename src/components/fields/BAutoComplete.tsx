import { Autocomplete, TextField } from "@mui/material";
import { CSSProperties, FC, useState } from "react";

interface BAutoCompleteProps {
	onChange?: (event: any) => any;
	value?: any;
	name?: string;
	label?: string;
	items?: Array<{ label?: string; value: any }>;
	style?: CSSProperties;
	error?: any;
	isPaginated?: boolean;
	onRequestMore?: (page: number) => any;
}

const BAutoComplete: FC<BAutoCompleteProps> = ({
	onChange,
	value,
	name,
	items,
	label,
	error,
	style,
	isPaginated = false,
	onRequestMore,
}) => {
	const [suggestions, setSuggestions] = useState();

	return (
		<Autocomplete
			id="grouped-demo"
			options={
				items && items?.length > 0
					? items?.map((item) => ({
							label: item.label || item?.value,
							value: item.value,
					  }))
					: []
			}
			groupBy={(option) => option.label}
			getOptionLabel={(option) => option.label}
			sx={{ width: 300 }}
			renderInput={(params) => (
				<TextField {...params} label="With categories" />
			)}
		
		/>
	);
};

export default BAutoComplete;
