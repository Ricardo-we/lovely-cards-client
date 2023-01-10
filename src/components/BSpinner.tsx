import { CircularProgress } from "@mui/material";
import { FC } from "react";

interface BSpinnerProps {
    color?: "primary" | "secondary" | "error" | "info";
}
 
const BSpinner: FC<BSpinnerProps> = ({ color }) => {
    return ( 
        <CircularProgress
            color={color}
        />
     );
}
 
export default BSpinner;