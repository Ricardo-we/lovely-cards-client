import { Switch, SwitchProps } from "@mui/material";

import BLabel from "../BLabel";
import { FC } from "react";
import FlexBox from "../FlexBox";

interface BSwitchProps extends SwitchProps {
    children?: JSX.Element;
    label?: string;
}
 
const BSwitch: FC<BSwitchProps> = ({ children,label, ...props }) => {
    return ( 
        <FlexBox style={{width: "100%",}} direction="row" align="center" justify="flex-start">
            <Switch {...props}/>
            <BLabel>{label}</BLabel>
        </FlexBox>
     );
}
 
export default BSwitch;