import { FC, useEffect } from "react";
import { FormControl, Input } from "@mui/material";

import BButton from "../Buttons/BButton";
import BLabel from "../BLabel";
import BSpinner from "../BSpinner";
import { Image as ImageIcon } from "@mui/icons-material";
import { useFilePicker } from "use-file-picker";

// import styles from "../../styles/components/fields/"

interface BFilePickerProps {
	onChange?: (data?: File | any) => any;
	value?: File | string | any;
	label?: string;
	error?: string | any;
	accept?: string[];
	multiple?: boolean;
}

const BFilePicker: FC<BFilePickerProps> = ({
	error,
	value,
	onChange,
	label,
	accept,
	multiple = false,
}) => {
	const [openFileSelector, { plainFiles, filesContent, loading }] = useFilePicker({
		accept,
		multiple,
	});

	const handleChange = () => {
		openFileSelector();
	};
	
	useEffect(() => {
		if (onChange && plainFiles?.length > 0) onChange(multiple ? plainFiles : plainFiles[0]);
	}, [plainFiles])

	return (
		<FormControl style={{ width: "95%", marginBlock: "8px" }}>
			<BLabel>{label}</BLabel>
			<BButton
				endIcon={<ImageIcon />}
				style={{ textAlign: "left" }}
				disabled={loading}
				onClick={handleChange}
				variant="outlined"
			>
				{loading ? (
					<BSpinner color="primary" />
				) : (
                    plainFiles[0]?.name || label || "Select file"
				)}
			</BButton>
			<BLabel style={{ color: "red" }}>{error}</BLabel>
		</FormControl>
	);
};

export default BFilePicker;
