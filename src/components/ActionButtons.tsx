import { Box, Button } from "@mui/material";

import BButton from "./Buttons/BButton";
import { CSSProperties } from "@mui/styled-engine-sc";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FC } from "react";
import FlexBox from "./FlexBox";
import PencilIcon from "@mui/icons-material/Create";

interface ActionButtonsProps {
	onDelete?: () => any;
	onUpdate?: () => any;
	children?: JSX.Element | JSX.Element[] | string[] | string;
	variant?:  "text" | "outlined" | "contained";
	style?: any;
}

const ActionButtons: FC<ActionButtonsProps> = ({
	onDelete,
	onUpdate,
	children,
	variant="contained",
	style,
}) => {
	return (
		<FlexBox
			align="center"
			justify="space-evenly"
			direction="row"
			style={{
				...style,
				width: "auto",
			}}
			onClick={e => e.stopPropagation()}
		>
			<BButton variant={variant} onClick={() => onDelete && onDelete()} color="error">
				<DeleteForeverIcon />
			</BButton>
			<BButton variant={variant} onClick={() => onUpdate && onUpdate()} color="primary">
				<PencilIcon />
			</BButton>
			{children}
		</FlexBox>
	);
};

export default ActionButtons;
