import { FC, HTMLAttributes } from "react";

import styles from "../styles/components/fields/BLabel.module.css";

interface BLabelProps extends HTMLAttributes<HTMLLabelElement> {

}
 
const BLabel: FC<BLabelProps> = ({ ...props }) => {

    return ( 
        <label
            className={styles["main-label"]}
            {...props}
        >
            {props.children}
        </label>
    );
}
 
export default BLabel;