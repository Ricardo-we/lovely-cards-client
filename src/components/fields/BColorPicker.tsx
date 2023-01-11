import BLabel from "../BLabel";
import { FC } from "react";
import FlexBox from "../FlexBox";
import { HexColorPicker, } from "react-colorful";

interface BColorPickerProps {
    onChange?: (value: string | any) => any;
    value?: string;
    label?: string;
}

const BColorPicker: FC<BColorPickerProps> = ({ value, onChange,label, ...props }) => {
	return (
		<FlexBox direction="column" align="flex-start" justify="flex-start" style={{width: "95%", marginInline: "auto"}}>
            <BLabel style={{textAlign:"left"}}>{label}</BLabel>
            <HexColorPicker
            
                style={{marginInline: 0, width: "100%"}}
                onChange={onChange}
                // defaultValue={"#fff"}
                color={value}
            />
   
		</FlexBox>
	);
};

export default BColorPicker;
