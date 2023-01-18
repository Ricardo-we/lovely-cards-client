import { Theme, Typography, makeStyles, useTheme } from "@mui/material";

import { APP_CONFIG } from "../config/app-settings";
import BButton from "../components/Buttons/BButton";
import BCardImage from "../components/BCardImage";
import BLink from "../components/BLink";
import FlexBox from "../components/FlexBox";
import Footer from "../components/Footer";
import Head from "next/head";
import MainLayout from "../components/Layouts/MainLayout";
import SampleDisplayer from "../components/CardDisplayers/SamplesDisplayer";
import cssStyles from "../styles/HomePage.module.css";
import { replaceWithList } from "../utils/generic/string.utils";
import { useLanguageContext } from "../contexts/LanguageContext";

export default function Home() {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { language } = useLanguageContext();
	const viewLabels = language?.view?.homepage;

	return (
		<main className={cssStyles["mainContainer"]}>
			<FlexBox style={{ marginTop: 20, padding: "30px" }} align="center">
				<FlexBox
					style={{ width: "50%", minWidth: "200px" }}
					direction="column"
					align="center"
					justify="center"
				>
					<Typography
						style={{ marginBottom: "10px" }}
						color="white"
						variant="h3"
					>
						{viewLabels?.startTitle}
					</Typography>
					<Typography
						style={{ textAlign: "center" }}
						color="white"
						variant="subtitle1"
					>
						{viewLabels?.startBody}
					</Typography>
				</FlexBox>

				<img
					style={{
						objectFit: "cover",
						width: "50%",
						minWidth: "200px",
						height: "auto",
					}}
					src="/assets/images/messagebox.svg"
				/>
			</FlexBox>

			<FlexBox
				style={{ marginTop: 20, marginBottom: "100px", padding: "30px", width: "100%" }}
				justify="space-evenly"
				align="center"
			>
				<BCardImage
					cardStyle={styles.cardImageStyle}
					title={viewLabels?.free}
					imgSrc="/assets/images/message-card-2.svg"
					content={viewLabels?.freeDescription}
				/>

				<BCardImage
					cardStyle={styles.cardImageStyle}
					title={viewLabels?.easy}
					imgSrc="/assets/images/message-card.svg"
					content={viewLabels?.easyDescription}
				/>

				<BCardImage
					cardStyle={styles.cardImageStyle}
					imgSrc="/assets/images/message-mailbox-2.svg"
					title={viewLabels?.customizable}
					content={viewLabels?.customizableDescription}
				/>
			</FlexBox>

			<FlexBox
				style={{ marginBottom: "100px" }}
				align="center"
				justify="space-around"
			>
				<SampleDisplayer
					type="cards"
					displayerStyle={styles.sliderStyle}
				/>
				<SampleDisplayer
					type="slides"
					displayerStyle={styles.sliderStyle}
				/>
				<SampleDisplayer
					type="flip"
					displayerStyle={styles.sliderStyle}
				/>
				<SampleDisplayer
					type="cube"
					displayerStyle={styles.sliderStyle}
				/>
			</FlexBox>

			<FlexBox
				direction="column"
				align="center"
				justify="center"
				style={styles.bottomContainer}
			>
				<Typography variant="h4">{viewLabels?.aboutUs}</Typography>
				<Typography
					style={{ width: "80%", textAlign: "center" }}
					variant="overline"
				>
					{viewLabels?.aboutUsDescription}
				</Typography>
				<BLink
					to={`mailto:${APP_CONFIG.CONTACT_EMAIL}?subject=Feedback&body=Message`}
					style={{ color: theme.palette.primary.main, fontSize: 22 }}
				>
					{language?.generic?.emailLinkMask}
				</BLink>
			</FlexBox>

			<Footer/>
		</main>
	);
}

const useStyles = (theme: Theme) => ({
	image: {
		objectFit: "cover",
	},
	cardImageStyle: {
		minWidth: "250px",
		maxWidth: "250px",
		minHeight: "340px",
		maxHeight: "340px",
		backgroundColor: theme.palette.secondary.main,
		padding: "20px",
	},
	sliderStyle: {
		width: "45%",
		marginTop: "10px",
	},
	bottomContainer: {
		width: "100%",
		minHeight: "400px",
		margin: 0,
		background: theme.palette?.secondary.main,
		marginBlock: "50px"
	},
});
