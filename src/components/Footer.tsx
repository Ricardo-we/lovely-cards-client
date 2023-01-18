import { IconButton, Typography, useTheme } from "@mui/material";

import { APP_CONFIG } from "../config/app-settings";
import { FC } from "react";
import FlexBox from "./FlexBox";
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from "../styles/components/Footer.module.css"
import { useLanguageContext } from "../contexts/LanguageContext";

interface FooterProps {
    
}
 
const Footer: FC<FooterProps> = () => {
    const theme = useTheme();
    const { language } = useLanguageContext();

    return ( 
        <footer className={styles.footer} style={{backgroundColor: theme.palette.primary.main}}>
            
            <FlexBox direction="column" align="flex-start" justify="flex-start">
                <Typography variant="subtitle1">{language?.generic?.author} Ricardo Andrés Morales Castillo</Typography>
                <Typography variant="subtitle1">Email {APP_CONFIG.CONTACT_EMAIL}</Typography>

            </FlexBox>

        </footer>
    );
}
 
export default Footer;