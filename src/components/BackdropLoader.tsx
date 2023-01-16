import { FC } from "react";
import styles from "../styles/components/BackdropLoader.module.css";

interface BackdropLoaderProps {
    
}
 
const BackdropLoader: FC<BackdropLoaderProps> = () => {
    return ( 
        <div className={styles.backdrop}>
            <div className={styles?.loader}></div>
        </div>
    );
}
 
export default BackdropLoader;