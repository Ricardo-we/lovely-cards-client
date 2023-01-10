import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardProps,
	Collapse,
	IconButton,
	IconButtonProps,
	styled,
} from "@mui/material";
import { FC, useState } from "react";

import ExpandMore from "./Buttons/ExpandMore";
import type { children } from "../types/Components";

interface BCardProps extends CardProps{
	children: children;
    header?: children
    topContent?: children;
	cardActions?: children
	subHeader?: children;
}
/***
 * @header CardHeader
 * @topContent the top card content
 * @children the expanded content
 * */
const BCard: FC<BCardProps> = ({ subHeader, header,cardActions, topContent, children, ...props }) => {
	const [cardExpanded, setCardExpanded] = useState<boolean>(false);

	return (
		<Card
            {...props}
        >
            <CardHeader
				title={header}
				subheader={subHeader}
			/>

            <CardContent>
                {topContent}
            </CardContent>
            
			<CardActions>
				{cardActions}
				<ExpandMore
					expand={cardExpanded}
					onClick={(e) => {
						e.stopPropagation();
						setCardExpanded((prev) => !prev)
					}}
					aria-expanded={cardExpanded}
					aria-label="show more"
				/>
			</CardActions>

			<Collapse in={cardExpanded} timeout="auto" unmountOnExit>
				<CardContent>{children}</CardContent>
			</Collapse>
		</Card>
	);
};

export default BCard;
