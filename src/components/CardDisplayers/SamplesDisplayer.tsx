import { Theme, Typography, useTheme } from "@mui/material";
import { getCardDisplayer, getSlide } from "./cardDisplayerUtils";

import { FC } from "react";
import FlexBox from "../FlexBox";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { useWindow } from "../../hooks/useWindow";

interface SampleDisplayerProps {
	type: string;
	displayerStyle?: object;
}

const SampleDisplayer: FC<SampleDisplayerProps> = ({
	type,
	displayerStyle,
}) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { language } = useLanguageContext();
	const window_ = useWindow();

	// DYNAMIC COMPONENTS
	const Displayer = getCardDisplayer(type);
	const Slide = getSlide(type);

	return (
		<FlexBox
			style={{
				// width: "50%",
				height: "300px",
				// marginInline: "auto",
                padding: 0,
                
				...displayerStyle,
			}}
            direction="column"
            wrap="nowrap"
            align="center"
            justify="center"
		>
			<Typography variant="h6">
				{language?.generic?.card_types?.[type]}
			</Typography>

			<Displayer
				style={{
					width: "100%",
					height: "100%",
					marginInline: "auto",
				}}
				slides={[
					<Slide
						key={0}
						style={{
							...styles.imageSlide,
							...styles.slide,
							backgroundImage: `url(https://picsum.photos/${Math.floor((window_?.innerWidth || 500) / 2)}/400?grayscale)`,
							backgroundAttachment: "fixed",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
						}}
						color={"white"}
					/>,
					<Slide
						key={1}
						style={styles.slide}
						color={theme.palette.primary.main}
					>
						<h4
							style={{
								color: "black",
								fontSize: "25px",
							}}
						>
							{language?.generic?.sampleText}
						</h4>
						<Typography
							style={{ color: "black" }}
							variant="caption"
						>
							{language?.generic?.sampleText}
						</Typography>
					</Slide>,
				]}
				autoPlay
			/>
		</FlexBox>
	);
};

const useStyles = (theme: Theme) => ({
	slide: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "80%",
		backgroundColor: theme.palette.secondary.main,
		marginHorizontal: "auto",
	},

	slideButton: {
		width: "60px",
		height: "45px",
		marginRight: "10px",
	},
	imageSlide: {
		width: "90%",
		height: "100%",
	},
	imageSlideImage: {
		width: "100%",
		height: "100%",
		// objectFit: "cover"
	},
});

export default SampleDisplayer;
