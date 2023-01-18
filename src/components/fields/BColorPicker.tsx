import BLabel from "../BLabel";
import { FC } from "react";
import FlexBox from "../FlexBox";
import { HexColorPicker } from "react-colorful";

interface BColorPickerProps {
	onChange?: (value: string | any) => any;
	value?: string;
	label?: string;
}

const BColorPicker: FC<BColorPickerProps> = ({
	value,
	onChange,
	label,
	...props
}) => {
	return (
		<FlexBox
			direction="column"
			align="center"
			justify="center"
			style={{ width: "95%", marginInline: "auto" }}
		>
			<BLabel style={{ textAlign: "left", width:"100%", marginBlock: "10px" }}>{label}</BLabel>
			<HexColorPicker
				style={{ marginInline: 0, width: "90%", maxHeight: "150px" }}
				onChange={onChange}
				// defaultValue={"#fff"}
				color={value}
			/>
		</FlexBox>
	);
};

export default BColorPicker;
