import { Box, Button } from "@mui/material";

import BButton from "./Buttons/BButton";
import { FC } from "react";
import FlexBox from "./FlexBox";

interface ActionButtonsProps {
	onDelete?: () => any;
	onUpdate?: () => any;
	children?: JSX.Element | JSX.Element[] | string[] | string;
	customLabels?: {
		deleteButton?: string;
		updateButton?: string;
	};
}

const ActionButtons: FC<ActionButtonsProps> = ({
	onDelete,
	onUpdate,
	children,
	customLabels,
}) => {
	return (
		<FlexBox
			align="center"
			justify="space-around"
			direction="row"
			style={{
				width: "100%",
			}}
		>
			<BButton
				onClick={() => onDelete && onDelete()}
				color="error"
			>
				{customLabels?.deleteButton || "Eliminar registro"}
			</BButton>
			<BButton
				onClick={() => onUpdate && onUpdate()}
				color="primary"
			>
				{customLabels?.updateButton || "Actualizar registro"}
			</BButton>
			{children}
		</FlexBox>
	);
};

export default ActionButtons;
