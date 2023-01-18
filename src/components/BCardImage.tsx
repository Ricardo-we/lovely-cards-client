import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { FC } from "react";
import Typography from "@mui/material/Typography";

interface BCardImageProps {
	title?: string;
	content?: string;
	imgSrc?: string;
    cardStyle?: object;
}

const BCardImage: FC<BCardImageProps> = ({ imgSrc, title, content, cardStyle }) => {
	return (
		<Card  sx={{ maxWidth: 345, ...cardStyle }}>
			<CardActionArea>
				<CardMedia component="img" height="140" image={imgSrc} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{content}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default BCardImage;
